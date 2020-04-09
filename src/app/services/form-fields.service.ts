import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormFieldsService {

  constructor() { }

  shippingInfoObj = {
    'guest-sign-in-email': { label: 'Email', required: true, error: 'Please input a valid email', type: 'email', hasError: false },
    'shipping-first-name': { label: 'First Name', required: true, error: 'Please input a first name', type: 'text', hasError: false },
    'shipping-last-name': { label: 'Last Name', required: true, error: 'Please input a last name', type: 'text', hasError: false },
    'shipping-address': { label: 'Address', required: true, error: 'Please input an address', type: 'text' },
    'shipping-apt-suite': { label: 'Apt / Suite', required: false, error: '', type: 'text', hasError: false },
    'shipping-city': { label: 'City', required: true, error: 'Please input a city name', type: 'text', hasError: false },
    'shipping-province': { label: 'Province', required: true, error: 'Please select a province', type: 'select', hasError: false },
    'shipping-postal-code': { label: 'Post Code', required: true, error: 'Please input a postal code', type: 'text', hasError: false },
    'shipping-phone-number': { label: 'Phone Number', required: true, error: 'Please enter a phone number', type: 'tel', hasError: false },
  };

  billingInfoObj = {
    'billing-first-name': { label: 'First Name', required: true, error: 'Please input a first name', type: 'text', hasError: false },
    'billing-last-name': { label: 'Last Name', required: true, error: 'Please input a last name', type: 'text', hasError: false },
    'billing-address': { label: 'Address', required: true, error: 'Please input an address', type: 'text' },
    'billing-apt-suite': { label: 'Apt / Suite', required: false, error: '', type: 'text', hasError: false },
    'billing-city': { label: 'City', required: true, error: 'Please input a city name', type: 'text', hasError: false },
    'billing-province': { label: 'Province', required: true, error: 'Please select a province', type: 'select', hasError: false },
    'billing-postal-code': { label: 'Post Code', required: true, error: 'Please input a postal code', type: 'text', hasError: false },
    'billing-phone-number': { label: 'Phone Number', required: true, error: 'Please enter a phone number', type: 'tel', hasError: false },
  };

  paymentInfoObj = {
    'credit-card-number': {
      label: 'Credit Card Number',
      required: true,
      error: 'Please enter a valid credit card number.',
      type: 'tel',
      hasError: false,
      ariaDescribedBy: 'payment-info-heading error-msg-cc-number sr-only-accepted-cc',
      dataInputType: 'credit-card-number',
      toolTip: false,
      maxLength: 16,
      column: false,
      row: false
    },
    'expiry-date': {
      label: 'Expiry Date (MM/YY)',
      required: true,
      error: 'Please enter a valid expiry date',
      type: 'text',
      hasError: false,
      ariaDescribedBy: 'payment-info-heading error-msg-expiry-date sr-only-cc-expiry-date',
      dataInputType: 'expiry-date',
      toolTip: false,
      maxLength: 5,
      column: true,
      row: true
    },
    'security-code': {
      label: 'Security Code',
      required: true,
      error: 'Please enter a valid security code',
      type: 'text',
      hasError: false,
      ariaDescribedBy: 'payment-info-heading error-msg-ccv',
      dataInputType: 'ccv',
      toolTip: true,
      maxLength: 4,
      column: true,
      row: false
    }
  }

  provincesObj = [
    { key: 'AB', name: 'Alberta' },
    { key: 'BC', name: 'British Columbia' },
    { key: 'MB', name: 'Manitoba' },
    { key: 'NB', name: 'New Brunswick' },
    { key: 'NL', name: 'Newfoundland and Labrador' },
    { key: 'NT', name: 'Northwest Territories' },
    { key: 'NS', name: 'Nova Scotia' },
    { key: 'NU', name: 'Nunavut' },
    { key: 'ON', name: 'Ontario' },
    { key: 'PE', name: 'Prince Edward Island' },
    { key: 'QC', name: 'Quebec' },
    { key: 'SK', name: 'Saskatchewan' },
    { key: 'YT', name: 'Yukon Territory', }
  ];

  regex = {
    'email': /^([A-Za-z0-9\-\/\:\;\(\)\$\&\'\=\,\?\*\#\%\^\+\_\.\|\[\]\{\}\<\>\\\'])+\@([A-Za-z0-9_\-])+\.([A-Za-z]{2,16})$/,
    'postal-code': /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/,
    'phone-number': /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im,
    'credit-card-number': /^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/,
    'expiry-date': /^(0\d|1[0-2])\/\d{2}$/,
    'ccv': /^[0-9]{3,4}$/,
  }
}
