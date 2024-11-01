import { Component, computed } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BaseButtonComponent } from '../../../components/base-button/base-button.component';
import { NgIf } from '@angular/common';
import { revisionDateValidator } from '../../validators/revision-date.validator';
import { releaseDateValidator } from '../../validators/release-date.validator';
import { map } from 'rxjs/operators';
import { ProductInterface } from '../../interface/product.interface';
import { RouteNames } from '../../../route-names';
import { FormErrorService } from '../../services/form-error.service';
import { ProductService } from '../../services/product.service';
import { RequestState } from '../../states/index.states';

@Component({
  selector: 'app-add-and-update',
  standalone: true,
  imports: [
    RouterOutlet,
    ReactiveFormsModule,
    BaseButtonComponent,
    NgIf
  ],
  templateUrl: 'add-and-update.component.html',
  styleUrl: 'add-and-update.component.scss'
})
export default class AddAndUpdateComponent {
  registerForm: FormGroup;
  productId: string | null = null;
  product: ProductInterface | undefined;
  routePath = computed(() => this.route.snapshot.routeConfig?.path);
  isAddProductRoute = computed(() => this.routePath() === RouteNames.addProduct);
  isEditProductRoute = computed(() => this.routePath() === `${RouteNames.editProduct}/:id`);
  titlePage = computed(() => this.isAddProductRoute() ? 'Formulario de Registro' : 'Formulario de Edición');
  stateRequest: RequestState = 'NONE';
  protected readonly RouteNames = RouteNames;

  constructor(
    private readonly fb: FormBuilder,
    private readonly productService: ProductService,
    protected readonly router: Router,
    private readonly formErrorService: FormErrorService,
    private readonly route: ActivatedRoute) {

    this.registerForm = this.fb.nonNullable.group({
      id: [
        '',
        [Validators.required, Validators.minLength(3), Validators.maxLength(10)]
      ],
      name: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(100)]],
      description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(200)]],
      logo: ['', Validators.required],
      date_release: ['', [Validators.required, releaseDateValidator]],
      date_revision: ['', [Validators.required]]
    }, {
      validators: [revisionDateValidator]
    });
  }

  get isFormValid(): boolean {
    return this.registerForm.valid;
  }

  ngOnInit(): void {
    if (this.isAddProductRoute()) return;
    this.productId = this.route.snapshot.paramMap.get('id');
    if (this.isEditProductRoute() && this.productId) this.loadProduct(this.productId);
  }


  submitForm() {
    if (!this.registerForm.valid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    if (this.isAddProductRoute()) {
      this.handleCreateProduct();
      return;
    }

    this.updateProduct(this.registerForm.value);
  }

  getErrorMessage(field: string): string | null {
    return this.formErrorService.getErrorMessage(this.registerForm, field);
  }

  private handleCreateProduct(): void {

    const idControl = this.registerForm.get('id');
    this.checkIdExists(idControl!).subscribe((error) => {
      if (error) {
        idControl?.setErrors({ idExists: true });
        return;
      }
      this.createProduct(this.registerForm.value as ProductInterface);
    });
  }


  private createProduct(product: ProductInterface): void {
    if (this.stateRequest === 'LOADING') return;
    this.stateRequest = 'LOADING';
    this.productService.create(product).subscribe({
      next: () => {
        this.stateRequest = 'LOAD_ENDED';
        this.navigateToHome();
      },
      error: (error) => {
        this.stateRequest = 'ERROR';
        console.error('Error when creating the product:', error);
      }
    });
  }

  private updateProduct(product: ProductInterface): void {
    if (this.stateRequest === 'LOADING') return;
    this.stateRequest = 'LOADING';
    this.productService.update(product).subscribe({
      next: () => {
        this.stateRequest = 'LOAD_ENDED';
        this.navigateToHome();
      },
      error: (error) => {
        this.stateRequest = 'ERROR';
        console.error('Error updating the product:', error);
      }
    });
  }

  private navigateToHome(): void {
    this.router.navigate([RouteNames.home]);
  }

  private loadProduct(productId: string): void {
    this.productService.getById(productId).subscribe((product) => {
      if (!product) return;
      const date_release = new Date(product.date_release);
      const date_revision = new Date(product.date_revision);

      this.registerForm.patchValue({
        id: product.id,
        name: product.name,
        description: product.description,
        logo: product.logo,
        date_release,
        date_revision
      });
    });
  }

  private checkIdExists(control: AbstractControl) {
    return this.productService.verificationId(control.value).pipe(
      map((exists) => (exists ? { idExists: true } : null))
    );
  }
}
