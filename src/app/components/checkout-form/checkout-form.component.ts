import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { FormFieldsService } from '../../services/form-fields.service'
import { sortObj, activeElementMatches } from '../../services/utils.service';

@Component({
  selector: 'app-checkout-form',
  templateUrl: './checkout-form.component.html',
  styleUrls: ['./checkout-form.component.scss']
})
export class CheckoutFormComponent implements OnInit {
  checkoutForm: FormGroup;
  totalError: number;
  totlaErroText: string = '';
  shippingMetthod: string = '';
  billingAddressSameAsShipping: boolean = true;
  billingInfo: FormArray;
  objectKeys = Object.keys;

  constructor(private fb: FormBuilder, private ffo: FormFieldsService) { }

  shippingInfoObj = this.ffo.shippingInfoObj;
  paymentInfoObj = this.ffo.paymentInfoObj;
  billingInfoObj = this.ffo.billingInfoObj;
  provincesObj = this.ffo.provincesObj;
  regex = this.ffo.regex;

  ngOnInit(): void {
    this.checkoutForm = this.fb.group({
      shippingInfo: this.fb.array([this.createCheckoutShippingInfoForm()]),
      paymentMenthod: this.fb.array([this.createPaymentMethodForm()]),
      billingInfo: this.fb.array([]),
    });
  }

  createCheckoutShippingInfoForm(): FormGroup {
    let checkoutformInfoObject = this.objectKeys(this.shippingInfoObj).reduce((acc, key) => {
      switch (key) {
        case 'shipping-apt-suite':
          acc[key] = [null];
          break;
        case 'guest-sign-in-email':
          acc[key] = [null, Validators.compose([
            Validators.required,
            Validators.pattern(new RegExp(this.regex['email'])),
            Validators.minLength(2)
          ])];
          break;
        case 'shipping-phone-number':
          acc[key] = [null, Validators.compose([
            Validators.required,
            Validators.pattern(new RegExp(this.regex["phone-number"])),
            Validators.minLength(10)
          ])];
          break;
        case 'shipping-postal-code':
          acc[key] = [null, Validators.compose([
            Validators.required,
            Validators.pattern(new RegExp(this.regex["postal-code"])),
            Validators.minLength(6)
          ])];
          break;
        default:
          acc[key] = [null, Validators.compose([Validators.required])];
      }

      acc['shipping-method'] = ['cp-10-day'];

      return acc;
    }, []);
    return this.fb.group(checkoutformInfoObject);
  }

  createCheckoutBillingInfoForm(): FormGroup {
    let checkoutformInfoObject = !this.billingAddressSameAsShipping && this.objectKeys(this.billingInfoObj).reduce((acc, key) => {
      switch (key) {
        case 'billing-apt-suite':
          acc[key] = [null];
          break;
        case 'billing-phone-number':
          acc[key] = [null, Validators.compose([
            Validators.required,
            Validators.pattern(new RegExp(this.regex["phone-number"])),
            Validators.minLength(10)
          ])];
          break;
        case 'billing-postal-code':
          acc[key] = [null, Validators.compose([
            Validators.required,
            Validators.pattern(new RegExp(this.regex["postal-code"])),
            Validators.minLength(6)
          ])];
          break;
        default:
          acc[key] = [null, Validators.compose([
            Validators.required,
            Validators.min(2)
          ])];
      }
      return acc;
    }, []);
    return this.fb.group(checkoutformInfoObject);
  }

  createPaymentMethodForm() {
    let checkoutPaymentMethodObject = this.objectKeys(this.paymentInfoObj).reduce((acc, key) => {
      switch (key) {
        case 'credit-card-number':
          acc[key] = [null, Validators.compose([
            Validators.required,
            Validators.pattern(new RegExp(this.regex["credit-card-number"]))
          ])]
          break;
        case 'expiry-date':
          acc[key] = [null, Validators.compose([
            Validators.required,
            Validators.pattern(new RegExp(this.regex["expiry-date"]))
          ])]
          break;
        case 'security-code':
          acc[key] = [null, Validators.compose([
            Validators.required,
            Validators.pattern(new RegExp(this.regex["ccv"]))
          ])]
          break;
      }
      return acc;
    }, []);

    return this.fb.group(checkoutPaymentMethodObject);
  }

  onSubmit() {
    if (this.checkoutForm.valid) {
      Object.values({ ...this.shippingInfoObj, ...this.paymentInfoObj, ...this.billingInfoObj }).map((value) => {
        value['hasError'] = false;
      });
      this.totalError = 0;
      this.totlaErroText = '';

      let formShippingInfo = this.objectKeys(this.checkoutForm.value.shippingInfo[0])
        .filter(value => value != "guest-sign-in-email")
        .reduce((obj, key) => {
          obj[key] = this.checkoutForm.value.shippingInfo[0][key];
          return obj;
        }, {});

      let formUserInfo = this.objectKeys(this.checkoutForm.value.shippingInfo[0])
        .filter(value => value == "guest-sign-in-email")
        .reduce((obj, key) => {
          obj[key] = this.checkoutForm.value.shippingInfo[0][key];
          obj['status'] = 'guest';
          return obj;
        }, {});

      const billingInfo = this.getBillingInfo(formShippingInfo);
      const paymentInfo = Object.entries(this.checkoutForm.value.paymentMenthod[0])
        .filter(([key]) => key != 'security-code')
        .reduce((acc, [key, value]) => {
          let stringValue = String(value);
          acc[key] = value && key === 'credit-card-number' ? stringValue.substr(stringValue.length - 4) : stringValue;
          acc['billingAddressSame'] = this.billingAddressSameAsShipping;
          return acc;
        }, {});

      localStorage.setItem('shippingInfo', JSON.stringify(sortObj(formShippingInfo)));
      localStorage.setItem('paymentInfo', JSON.stringify(sortObj({ ...billingInfo, ...paymentInfo })));
      localStorage.setItem('user', JSON.stringify(formUserInfo));

      this.goToOrderConfirmation();
    } else {
      this.validateAllFormFields(this.checkoutForm);
    }
  }

  getBillingInfo(formShippingInfo: any) {
    let billingInfo: any;
    if (this.billingAddressSameAsShipping) {
      billingInfo = Object.entries(formShippingInfo)
        .filter(([key]) => key != 'shipping-method')
        .reduce((acc, [key, value]) => {
          let newKey = key.replace('shipping', 'billing');
          acc[newKey] = value
          return acc;
        }, {});
    } else {
      billingInfo = this.objectKeys(this.checkoutForm.value.billingInfo[0])
        .reduce((obj, key) => {
          obj[key] = this.checkoutForm.value.billingInfo[0][key];
          return obj;
        }, {});
    }
    return billingInfo;
  }

  validateAllFormFields(formGroup: FormGroup) {
    const billingFormControls = !this.billingAddressSameAsShipping ? formGroup.controls.billingInfo['controls'][0].controls : {};
    const formGroupControls = { ...formGroup.controls.shippingInfo['controls'][0].controls, ...formGroup.controls.paymentMenthod['controls'][0].controls, ...billingFormControls };
    this.objectKeys(formGroupControls).forEach(field => {
      const control = formGroupControls[field];
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
        if (field != 'shipping-method') {
          this.isFieldValid(field);
        }
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  isFieldValid(field: string) {
    const billingFormControls = !this.billingAddressSameAsShipping && this.checkoutForm.controls.billingInfo['controls'][0].controls;
    const formGroupControls = { ...this.checkoutForm.controls.shippingInfo['controls'][0].controls, ...this.checkoutForm.controls.paymentMenthod['controls'][0].controls, ...billingFormControls };
    const formFieldControl = formGroupControls[field];
    const billingInfoObj = !this.billingAddressSameAsShipping && this.billingInfoObj;


    if (this.shippingInfoObj[field]) {
      this.shippingInfoObj[field].hasError = !formFieldControl.valid && !formFieldControl.touch;
    } else if (this.billingInfoObj[field] && billingFormControls) {
      this.billingInfoObj[field].hasError = !formFieldControl.valid && !formFieldControl.touch;
    } else {
      this.paymentInfoObj[field].hasError = !formFieldControl.valid && !formFieldControl.touch;
    }

    this.totalError = Object.values({ ...this.shippingInfoObj, ...this.paymentInfoObj, ...billingInfoObj }).reduce((t: number, value) => {
      if (value['hasError']) {
        t = t + 1;
      }
      return t;
    }, 0)

    setTimeout(() => {
      if (document.querySelectorAll('.form-control.has-error').length > 0) {
        let idName = document.querySelectorAll('.form-control.has-error')[0].id;
        document.getElementById(idName).focus();
      }
    }, 0);

    this.totlaErroText = this.totalError > 1 ? `You have ${this.totalError} errors in your form.` : `You have ${this.totalError} error in your form.`;
  }

  displayFieldCss(field: string) {
    return {
      'has-error': this.shippingInfoObj[field],
    };
  }

  shippingMethod(event) {
    this.shippingMetthod = event.currentTarget.value;
  }

  tooglebillingAddressSameAsShipping() {
    this.billingAddressSameAsShipping = !this.billingAddressSameAsShipping;

    this.checkoutForm.controls.billingInfo['controls'] = [];

    if (!this.billingAddressSameAsShipping) {
      this.billingInfo = <FormArray>this.checkoutForm.controls.billingInfo;
      this.billingInfo.removeAt(0);
      this.billingInfo.push(this.createCheckoutBillingInfoForm());
    }

    this.objectKeys(this.billingInfoObj).map(field => {
      this.billingInfoObj[field].hasError = false;
    })
  }

  goToOrderConfirmation() {
    console.log("I will take you to Order Confirmation page");
  }
}

// Field error component
@Component({
  selector: 'field-error-display',
  templateUrl: './field-error-display.component.html',
  styleUrls: ['./field-error-display.component.scss']
})
export class FieldErrorDisplayComponent implements OnInit {
  @Input() errorMsg: string;
  @Input() displayError: boolean;
  @Input() errorId: string;

  constructor() { }

  ngOnInit(): void { }
}

// Field error component
@Component({
  selector: 'tooltip',
  templateUrl: './tooltip.html',
  styleUrls: ['./tooltip.scss']
})
export class TooltipComponent implements OnInit {
  openToolTip: boolean = false;

  constructor() { }

  ngOnInit(): void { }

  blurCloseToolTip() {
    activeElementMatches('.payment-information__tooltip-popup *').then((focusInDropdown) => {
      if (!focusInDropdown) {
        this.openToolTip = false;
      }
    });
  }
}