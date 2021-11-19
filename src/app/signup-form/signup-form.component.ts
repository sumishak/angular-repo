import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PasswordMatch } from '../common/passwordMatch';
import { SearchCountryField, TooltipLabel } from "ngx-intl-tel-input";
import {TranslateService} from '@ngx-translate/core';
import { CurrencyList } from '../common/currency';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.scss']
})
export class SignupFormComponent implements OnInit {

  form: FormGroup;
  loading = false;
  submitted = false;
  showPassword: boolean;
  showConfirmPassword: boolean;
  SearchCountryField = SearchCountryField;
  TooltipLabel = TooltipLabel;
  isDisabled: boolean;
  imageUrl: any = '../assets/images/avatar.jpg';
  CurrencyLists: any;
  @ViewChild('fileInput', {static: false}) el: ElementRef;
  

  error_messages = {

    'email': [
      { type: 'required', message: 'Email is required.' },
      { type: 'email', message: 'please enter a valid email address.' }
    ],

    'password': [
      { type: 'required', message: 'password is required.' },
      {type: 'minLength', message: 'Should contain atleast 6 characters'}
    ],
    'confirmpassword': [
      { type: 'required', message: 'password is required.' },
      {type: 'minLength', message: 'Should contain atleast 6 characters'},
      { type: 'mustMatch', message: 'password must match.'}
    ],
    'gender': [
      {type: 'required', message: 'Gender is required.'}
    ],
    'dob': [
      {type: 'required', message: 'Date of Birth is required.'}
    ]
  }

  options = [
    { name: "INR", value: 3, currencyRate: 5 },
    { name: "USD", value: 1, currencyRate: 76 },
    { name: "CAD", value: 2, currencyRate: 20 }
  ]

  constructor(
    private formBuilder: FormBuilder,
    private cd: ChangeDetectorRef,
    public translate: TranslateService
  ) { 
    translate.addLangs(['en', 'mal', 'hindi']);
    translate.setDefaultLang('en');

    const browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/en|mal/) ? browserLang : 'en');
    this.CurrencyLists  = CurrencyList;
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      cpassword: ['', [Validators.required, Validators.minLength(6)]],
      phone: [''],
      gender: ['', Validators.required],
      dob: ['', Validators.required],
      address: [''],
      hobbies: [''],
      income: [''],
      selectedCurrency: ['INR'],
      acceptTerms: [false, Validators.requiredTrue],
      file: [null]
  }, { 
    validator: PasswordMatch('password', 'cpassword')
  });
  }

  get f() { return this.form.controls; }

  onSubmit() {
    this.submitted = true;  
    if (this.form.invalid) {
      return;
    }
}

onReadFile(event): void {
  let reader = new FileReader();
  let file = event.target.files[0];
  if (event.target.files && event.target.files[0]) {
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.imageUrl = reader.result;
      this.form.patchValue({
        file: reader.result
      });
    }
    this.cd.markForCheck();        
  }
}

convertWithCurrencyRate(){
  debugger
  let currencyRate = this.options.find(f=> f.name === this.form.controls.selectedCurrency.value).currencyRate;
  let amount=this.form.controls.income.value;
  if (currencyRate)
    amount = amount * currencyRate;
  
  this.form.controls.income.setValue(amount);
}

}
