(function () {

    'use strict';

    angular.module('app.plugin.adapter').factory('productDetailsAdapter', adapter);

    adapter.$inject = ['Variant', 'ProductOption', 'variantAdapter', 'productOptionAdapter', 'OPTION_TEMPLATE_STATES'];

    function adapter(Variant, ProductOption, variantAdapter, optionAdapter, OPTION_TEMPLATE_STATES) {

        return {
            transform: function (destination, source) {

                var variant,
                    rawVariant,
                    adaptedVariant;

                destination.id = source.id;
                destination.title = source.name;
                destination.shortDescription = source.description;
                // TODO: think how to get vendor/brand
                destination.vendor = ''; //source.vendor;

                // variants
                if (source.variations.length) {
                    destination.variants = source.variations.map(function (variant) {
                        adaptedVariant = Variant.build(variant, variantAdapter);
                        adaptedVariant.title = source.name;
                        adaptedVariant.productId = source.id;
                        return adaptedVariant;
                    });
                } else {
                    // if no variants in source, form a single variant from the product itself
                    rawVariant = createRawVarientFromSourceProduct(source);

                    adaptedVariant = Variant.build(rawVariant, variantAdapter);
                    adaptedVariant.title = source.name;
                    adaptedVariant.productId = source.id;
                    destination.variants = [adaptedVariant];
                }

                // images
                destination.images = source.images;
                combineVariantImages(destination.images, destination.variants, source.variations);

                destination.options = source.attributes.filter(function (option) {
                    return option.variation;
                }).map(function (option) {
                    return ProductOption.build(option, optionAdapter);
                });

                // select the first variant if available
                variant = source.variations.length ? source.variations[0] : null;

                if (variant && variant.image && variant.image.length && variant.image[0].id !== 0 && variant.image[0].name !== 'Placeholder') {
                    destination.image = extractImageSource(variant.image);
                } else {
                    destination.image = extractImageSource(source.images);
                }

                destination.price = variant ? parseFloat(variant.regular_price || variant.price) : parseFloat(source.regular_price || source.price);
                destination.salePrice = variant ? parseFloat(variant.sale_price) : parseFloat(source.sale_price);
                if (destination.salePrice !== 0 && !destination.salePrice) {
                    destination.salePrice = null;
                }

                if (source.categories) {
                    destination.categories = source.categories.map(function (category) {
                        return category.name;
                    });
                } else {
                    destination.categories = [];
                }

                destination.optionsLayoutState = getOptionsLayoutState(destination.options);
                destination.rawData = source;
                destination.isFullProduct = true;
            }
        };

        function extractImageSource(image) {
            var imageSrc;
            if (image.constructor === Array) {
                imageSrc = image.length ? image[0].src : '';
            } else {
                imageSrc = image.src;
            }

            return imageSrc;
        }

        function combineVariantImages(targetArray, variants, rawVariants) {
            variants.forEach(function (variant, index) {
                if (variant.imageId && !arrayContainsImage(targetArray, variant.imageId)) {
                    targetArray.push(rawVariants[index].image[0]);
                }
            });
        }

        function arrayContainsImage(targetArray, imageId) {
            var images = targetArray.filter(function (image) {
                return image.id === imageId;
            });

            return !!images.length;
        }

        function createRawVarientFromSourceProduct(source) {
            return {
                'id': source.id,
                'date_created': source.date_created,
                'date_modified': source.date_modified,
                'permalink': source.permalink,
                'sku': source.sku,
                'price': source.price,
                'regular_price': source.regular_price,
                'sale_price': source.sale_price,
                'date_on_sale_from': source.date_on_sale_from,
                'date_on_sale_to': source.date_on_sale_to,
                'on_sale': source.on_sale,
                'purchasable': source.purchasable,
                'visible': source.visible,
                'virtual': source.virtual,
                'downloadable': source.downloadable,
                'downloads': source.downloads,
                'download_limit': source.download_limit,
                'download_expiry': source.download_expiry,
                'tax_status': source.tax_status,
                'tax_class': source.tax_class,
                'manage_stock': source.manage_stock,
                'stock_quantity': source.stock_quantity,
                'in_stock': source.in_stock,
                'backorders': source.backorders,
                'backorders_allowed': source.backorders_allowed,
                'backordered': source.backordered,
                'weight': source.weight,
                'dimensions': source.dimensions,
                'shipping_class': source.shipping_class,
                'shipping_class_id': source.shipping_class_id,
                'image': source.images,
                'attributes': []
            };
        }

        function getOptionsLayoutState() {
            return OPTION_TEMPLATE_STATES.SHOW_ALL;
        }
    }
})();