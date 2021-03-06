/**
 *  Copyright (c) 2015, Fullstack.io
 *  All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */
System.register(['@angular/core', '@angular/platform-browser-dynamic'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, platform_browser_dynamic_1;
    var Product, ProductImage, ProductDepartment, PriceDisplay, ProductRow, ProductsList, SwitchSampleApp, StyleSampleApp, InventoryApp;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (platform_browser_dynamic_1_1) {
                platform_browser_dynamic_1 = platform_browser_dynamic_1_1;
            }],
        execute: function() {
            /**
             * Provides a `Product` object
             */
            Product = (function () {
                function Product(sku, name, imageUrl, department, price) {
                    this.sku = sku;
                    this.name = name;
                    this.imageUrl = imageUrl;
                    this.department = department;
                    this.price = price;
                }
                return Product;
            }());
            /**
             * @ProductImage: A component to show a single Product's image
             */
            ProductImage = (function () {
                function ProductImage() {
                }
                ProductImage = __decorate([
                    core_1.Component({
                        selector: 'product-image',
                        host: { class: 'ui small image' },
                        inputs: ['product'],
                        template: "\n  <img class=\"product-image\" [src]=\"product.imageUrl\">\n  "
                    }), 
                    __metadata('design:paramtypes', [])
                ], ProductImage);
                return ProductImage;
            }());
            /**
             * @ProductDepartment: A component to show the breadcrumbs to a
             * Product's department
             */
            ProductDepartment = (function () {
                function ProductDepartment() {
                }
                ProductDepartment = __decorate([
                    core_1.Component({
                        selector: 'product-department',
                        inputs: ['product'],
                        template: "\n  <div class=\"product-department\">\n    <span *ngFor=\"let name of product.department; let i=index\">\n      <a href=\"#\">{{ name }}</a>\n      <span>{{i < (product.department.length-1) ? '>' : ''}}</span>\n    </span>\n  </div>\n  "
                    }), 
                    __metadata('design:paramtypes', [])
                ], ProductDepartment);
                return ProductDepartment;
            }());
            /**
             * @PriceDisplay: A component to show the price of a
             * Product
             */
            PriceDisplay = (function () {
                function PriceDisplay() {
                }
                PriceDisplay = __decorate([
                    core_1.Component({
                        selector: 'price-display',
                        inputs: ['price'],
                        template: "\n  <div class=\"price-display\">${{ price }}</div>\n  "
                    }), 
                    __metadata('design:paramtypes', [])
                ], PriceDisplay);
                return PriceDisplay;
            }());
            /**
             * @ProductRow: A component for the view of single Product
             */
            ProductRow = (function () {
                function ProductRow() {
                }
                ProductRow = __decorate([
                    core_1.Component({
                        selector: 'product-row',
                        inputs: ['product'],
                        host: { 'class': 'item' },
                        directives: [ProductImage, ProductDepartment, PriceDisplay],
                        template: "\n  <product-image [product]=\"product\"></product-image>\n  <div class=\"content\">\n    <div class=\"header\">{{ product.name }}</div>\n    <div class=\"meta\">\n      <div class=\"product-sku\">SKU #{{ product.sku }}</div>\n    </div>\n    <div class=\"description\">\n      <product-department [product]=\"product\"></product-department>\n    </div>\n  </div>\n  <price-display [price]=\"product.price\"></price-display>\n  "
                    }), 
                    __metadata('design:paramtypes', [])
                ], ProductRow);
                return ProductRow;
            }());
            /**
             * @ProductsList: A component for rendering all ProductRows and
             * storing the currently selected Product
             */
            ProductsList = (function () {
                function ProductsList() {
                    this.onProductSelected = new core_1.EventEmitter();
                }
                ProductsList.prototype.clicked = function (product) {
                    this.currentProduct = product;
                    this.onProductSelected.emit(product);
                };
                ProductsList.prototype.isSelected = function (product) {
                    if (!product || !this.currentProduct) {
                        return false;
                    }
                    return product.sku === this.currentProduct.sku;
                };
                ProductsList = __decorate([
                    core_1.Component({
                        selector: 'products-list',
                        directives: [ProductRow],
                        inputs: ['productList'],
                        outputs: ['onProductSelected'],
                        template: "\n  <div class=\"ui items\">\n    <product-row \n      *ngFor=\"let myProduct of productList\" \n      [product]=\"myProduct\" \n      (click)='clicked(myProduct)'\n      [class.selected]=\"isSelected(myProduct)\">\n    </product-row>\n  </div>\n  "
                    }), 
                    __metadata('design:paramtypes', [])
                ], ProductsList);
                return ProductsList;
            }());
            SwitchSampleApp = (function () {
                function SwitchSampleApp() {
                    this.choice = 1;
                }
                SwitchSampleApp.prototype.nextChoice = function () {
                    this.choice += 1;
                    if (this.choice > 5) {
                        this.choice = 1;
                    }
                };
                SwitchSampleApp = __decorate([
                    core_1.Component({
                        selector: 'switch-sample-app',
                        template: "\n    <h4 class=\"ui horizontal divider header\" [ngStyle]=\"{color: 'white', 'background-color': 'blue', 'padding': '5px'}\">\n      Current choice is {{ choice }}\n    </h4>\n\n    <div class=\"ui raised segment\">\n      <ul [ngSwitch]=\"choice\">\n        <li *ngSwitchWhen=\"1\">First choice</li>\n        <li *ngSwitchWhen=\"2\">Second choice</li>\n        <li *ngSwitchWhen=\"3\">Third choice</li>\n        <li *ngSwitchWhen=\"4\">Fourth choice</li>\n        <li *ngSwitchWhen=\"2\">Second choice, again</li>\n        <li *ngSwitchDefault>Default choice</li>\n      </ul>\n    </div>\n\n    <div style=\"margin-top: 20px;\">\n      <button class=\"ui primary button\" (click)=\"nextChoice()\">\n        Next choice\n      </button>\n    </div>\n  "
                    }), 
                    __metadata('design:paramtypes', [])
                ], SwitchSampleApp);
                return SwitchSampleApp;
            }());
            StyleSampleApp = (function () {
                function StyleSampleApp() {
                    this.fontSize = 16;
                    this.color = "blue";
                    this.style = {
                        'background-color': '#ccc',
                        'border-radius': '50px',
                        'height': '100px',
                        'width': '100px',
                    };
                }
                StyleSampleApp.prototype.apply = function (color, fontSize) {
                    this.color = color;
                    this.fontSize = fontSize;
                };
                StyleSampleApp = __decorate([
                    core_1.Component({
                        selector: 'style-sample-app',
                        template: "\n    <h4 class=\"ui horizontal divider header\">\n      style.background-color\n    </h4>\n\n    <div [style.background-color]=\"'yellow'\">\n      Uses fixed yellow background\n    </div>\n\n    <h4 class=\"ui horizontal divider header\">\n      ngStyle literal\n    </h4>\n\n    <div [ngStyle]=\"{color: 'white', 'background-color': 'blue'}\">\n      Uses fixed white text on blue background\n    </div>\n\n    <h4 class=\"ui horizontal divider header\">\n      ngStyle literal and style.font-size.px\n    </h4>\n\n    <div>\n      <span [ngStyle]=\"{color: 'red'}\" [style.font-size.px]=\"fontSize\">\n        red text\n      </span>\n    </div>\n\n    <h4 class=\"ui horizontal divider header\">\n      ngStyle with an object\n    </h4>\n\n    <div [ngStyle]=\"style\"></div>\n    \n    <h4 class=\"ui horizontal divider header\">\n      Play with the color and font-size here\n    </h4>\n\n    <div class=\"ui input\">\n      <input type=\"text\" name=\"color\" value=\"{{color}}\" #colorinput>\n    </div>\n\n    <div class=\"ui input\">\n      <input type=\"text\" name=\"fontSize\" value=\"{{fontSize}}\" #fontinput>\n    </div>\n\n    <button class=\"ui primary button\" (click)=\"apply(colorinput.value, fontinput.value)\">\n      Apply settings\n    </button>\n\n    <h4 class=\"ui horizontal divider header\">\n      ngStyle with object property from variable\n    </h4>\n\n    <div>\n      <span [ngStyle]=\"{color: colorinput.value}\" [style.font-size.px]=\"fontSize\">\n        {{ colorinput.value }} text\n      </span>\n    </div>\n\n    <h4 class=\"ui horizontal divider header\">\n      style from variable\n    </h4>\n\n    <div [style.background-color]=\"colorinput.value\"\n         style=\"color: white;\">\n      {{ colorinput.value }} background\n    </div>\n\n    \n  "
                    }), 
                    __metadata('design:paramtypes', [])
                ], StyleSampleApp);
                return StyleSampleApp;
            }());
            /**
             * @InventoryApp: the top-level component for our application
             */
            InventoryApp = (function () {
                function InventoryApp() {
                    this.products = [
                        new Product('MYSHOES', 'Black Running Shoes', '/resources/images/products/black-shoes.jpg', ['Men', 'Shoes', 'Running Shoes'], 109.99),
                        new Product('NEATOJACKET', 'Blue Jacket', '/resources/images/products/blue-jacket.jpg', ['Women', 'Apparel', 'Jackets & Vests'], 238.99),
                        new Product('NICEHAT', 'A Nice Black Hat', '/resources/images/products/black-hat.jpg', ['Men', 'Accessories', 'Hats'], 29.99)
                    ];
                }
                InventoryApp.prototype.productWasSelected = function (product) {
                    console.log('Product clicked: ', product);
                };
                InventoryApp = __decorate([
                    core_1.Component({
                        selector: 'inventory-app',
                        directives: [ProductsList, SwitchSampleApp, StyleSampleApp],
                        template: "\n  <div class=\"inventory-app\">\n    <products-list \n      [productList]=\"products\" \n      (onProductSelected)=\"productWasSelected($event)\">\n    </products-list>\n  </div>\n  <switch-sample-app></switch-sample-app>\n  <style-sample-app></style-sample-app>\n  "
                    }), 
                    __metadata('design:paramtypes', [])
                ], InventoryApp);
                return InventoryApp;
            }());
            platform_browser_dynamic_1.bootstrap(InventoryApp);
        }
    }
});
//# sourceMappingURL=app.js.map