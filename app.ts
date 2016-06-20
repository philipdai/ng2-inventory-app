/**
 *  Copyright (c) 2015, Fullstack.io
 *  All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {
    Component,
    EventEmitter
} from '@angular/core';

import {bootstrap} from '@angular/platform-browser-dynamic';

/**
 * Provides a `Product` object
 */
class Product {
    constructor(public sku:string,
                public name:string,
                public imageUrl:string,
                public department:string[],
                public price:number) {
    }
}

/**
 * @ProductImage: A component to show a single Product's image
 */
@Component({
    selector: 'product-image',
    host: {class: 'ui small image'},
    inputs: ['product'],
    template: `
  <img class="product-image" [src]="product.imageUrl">
  `
})
class ProductImage {
    product:Product;
}

/**
 * @ProductDepartment: A component to show the breadcrumbs to a
 * Product's department
 */
@Component({
    selector: 'product-department',
    inputs: ['product'],
    template: `
  <div class="product-department">
    <span *ngFor="let name of product.department; let i=index">
      <a href="#">{{ name }}</a>
      <span>{{i < (product.department.length-1) ? '>' : ''}}</span>
    </span>
  </div>
  `
})
class ProductDepartment {
    product:Product;
}

/**
 * @PriceDisplay: A component to show the price of a
 * Product
 */
@Component({
    selector: 'price-display',
    inputs: ['price'],
    template: `
  <div class="price-display">\${{ price }}</div>
  `
})
class PriceDisplay {
    price:number;
}

/**
 * @ProductRow: A component for the view of single Product
 */
@Component({
    selector: 'product-row',
    inputs: ['product'],
    host: {'class': 'item'},
    directives: [ProductImage, ProductDepartment, PriceDisplay],
    template: `
  <product-image [product]="product"></product-image>
  <div class="content">
    <div class="header">{{ product.name }}</div>
    <div class="meta">
      <div class="product-sku">SKU #{{ product.sku }}</div>
    </div>
    <div class="description">
      <product-department [product]="product"></product-department>
    </div>
  </div>
  <price-display [price]="product.price"></price-display>
  `
})
class ProductRow {
    product:Product;
}

/**
 * @ProductsList: A component for rendering all ProductRows and
 * storing the currently selected Product
 */
@Component({
    selector: 'products-list',
    directives: [ProductRow],
    inputs: ['productList'],
    outputs: ['onProductSelected'],
    template: `
  <div class="ui items">
    <product-row 
      *ngFor="let myProduct of productList" 
      [product]="myProduct" 
      (click)='clicked(myProduct)'
      [class.selected]="isSelected(myProduct)">
    </product-row>
  </div>
  `
})
class ProductsList {
    /**
     * @input productList - the Product[] passed to us
     */
    productList:Product[];

    /**
     * @ouput onProductSelected - outputs the current
     *          Product whenever a new Product is selected
     */
    onProductSelected:EventEmitter<Product>;

    /**
     * @property currentProduct - local state containing
     *             the currently selected `Product`
     */
    currentProduct:Product;

    constructor() {
        this.onProductSelected = new EventEmitter();
    }

    clicked(product:Product):void {
        this.currentProduct = product;
        this.onProductSelected.emit(product);
    }

    isSelected(product:Product):boolean {
        if (!product || !this.currentProduct) {
            return false;
        }
        return product.sku === this.currentProduct.sku;
    }

}

@Component({
    selector: 'switch-sample-app',
    template: `
    <h4 class="ui horizontal divider header" [ngStyle]="{color: 'white', 'background-color': 'blue', 'padding': '5px'}">
      Current choice is {{ choice }}
    </h4>

    <div class="ui raised segment">
      <ul [ngSwitch]="choice">
        <li *ngSwitchWhen="1">First choice</li>
        <li *ngSwitchWhen="2">Second choice</li>
        <li *ngSwitchWhen="3">Third choice</li>
        <li *ngSwitchWhen="4">Fourth choice</li>
        <li *ngSwitchWhen="2">Second choice, again</li>
        <li *ngSwitchDefault>Default choice</li>
      </ul>
    </div>

    <div style="margin-top: 20px;">
      <button class="ui primary button" (click)="nextChoice()">
        Next choice
      </button>
    </div>
  `
})
class SwitchSampleApp {
    choice: number;

    constructor() {
        this.choice = 1;
    }

    nextChoice() {
        this.choice += 1;

        if (this.choice > 5) {
            this.choice = 1;
        }
    }
}

@Component({
    selector: 'style-sample-app',
    template: `
    <h4 class="ui horizontal divider header">
      style.background-color
    </h4>

    <div [style.background-color]="'yellow'">
      Uses fixed yellow background
    </div>

    <h4 class="ui horizontal divider header">
      ngStyle literal
    </h4>

    <div [ngStyle]="{color: 'white', 'background-color': 'blue'}">
      Uses fixed white text on blue background
    </div>

    <h4 class="ui horizontal divider header">
      ngStyle literal and style.font-size.px
    </h4>

    <div>
      <span [ngStyle]="{color: 'red'}" [style.font-size.px]="fontSize">
        red text
      </span>
    </div>

    <h4 class="ui horizontal divider header">
      ngStyle with an object
    </h4>

    <div [ngStyle]="style"></div>
    
    <h4 class="ui horizontal divider header">
      Play with the color and font-size here
    </h4>

    <div class="ui input">
      <input type="text" name="color" value="{{color}}" #colorinput>
    </div>

    <div class="ui input">
      <input type="text" name="fontSize" value="{{fontSize}}" #fontinput>
    </div>

    <button class="ui primary button" (click)="apply(colorinput.value, fontinput.value)">
      Apply settings
    </button>

    <h4 class="ui horizontal divider header">
      ngStyle with object property from variable
    </h4>

    <div>
      <span [ngStyle]="{color: colorinput.value}" [style.font-size.px]="fontSize">
        {{ colorinput.value }} text
      </span>
    </div>

    <h4 class="ui horizontal divider header">
      style from variable
    </h4>

    <div [style.background-color]="colorinput.value"
         style="color: white;">
      {{ colorinput.value }} background
    </div>

    
  `
})
class StyleSampleApp {
    color: string;
    fontSize: number;
    style: {
        'background-color': string,
        'border-radius': string,
        border?: string,
        width?: string,
        height?: string
    };

    constructor() {
        this.fontSize = 16;
        this.color = "blue";
        this.style = {
            'background-color': '#ccc',
            'border-radius': '50px',
            'height': '100px',
            'width': '100px',
        };
    }

    apply(color, fontSize) {
        this.color = color;
        this.fontSize = fontSize;
    }
}

/**
 * @InventoryApp: the top-level component for our application
 */
@Component({
    selector: 'inventory-app',
    directives: [ProductsList, SwitchSampleApp, StyleSampleApp],
    template: `
  <div class="inventory-app">
    <products-list 
      [productList]="products" 
      (onProductSelected)="productWasSelected($event)">
    </products-list>
  </div>
  <switch-sample-app></switch-sample-app>
  <style-sample-app></style-sample-app>
  `
})
class InventoryApp {
    products:Product[];

    constructor() {
        this.products = [
            new Product(
                'MYSHOES', 'Black Running Shoes',
                '/resources/images/products/black-shoes.jpg',
                ['Men', 'Shoes', 'Running Shoes'],
                109.99),
            new Product(
                'NEATOJACKET', 'Blue Jacket',
                '/resources/images/products/blue-jacket.jpg',
                ['Women', 'Apparel', 'Jackets & Vests'],
                238.99),
            new Product(
                'NICEHAT', 'A Nice Black Hat',
                '/resources/images/products/black-hat.jpg',
                ['Men', 'Accessories', 'Hats'],
                29.99)
        ];
    }

    productWasSelected(product:Product):void {
        console.log('Product clicked: ', product);
    }
}



bootstrap(InventoryApp);
