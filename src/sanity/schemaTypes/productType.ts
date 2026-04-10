import { formatPrice, formatTitle } from '@/lib/utils';
import { FaTshirt } from 'react-icons/fa';
import { defineField, defineType } from 'sanity';

export const productType = defineType({
  name: 'product',
  title: 'Products',
  icon: FaTshirt,
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Product Name',
      type: 'string',
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'basePrice',
      title: 'Base Price',
      type: 'number',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'Product Description',
      type: 'blockContent',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Product Category',
      type: 'reference',
      to: [{ type: 'productCategory' }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'brand',
      title: 'Product Brand',
      type: 'reference',
      to: [{ type: 'productBrand' }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'tag',
      title: 'Product Tag',
      type: 'reference',
      to: [{ type: 'productTag' }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'variants',
      title: 'Product Variants',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'sku',
              title: 'Product SKU',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'color',
              title: 'Product Color',
              type: 'reference',
              to: [{ type: 'productColor' }],
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'size',
              title: 'Product Size',
              type: 'reference',
              to: [{ type: 'productSize' }],
            }),
            defineField({
              name: 'priceOverride',
              title: 'Price Override',
              type: 'number',
            }),
            defineField({
              name: 'mainImages',
              title: 'Product Images',
              type: 'array',
              of: [{ type: 'blockImage' }],
              validation: (rule) => rule.required(),
            }),
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      name: 'name',
      basePrice: 'basePrice',
      category: 'category.name',
      tag: 'tag.name',
      image: 'variants.0.mainImages.0.asset',
    },
    prepare({ name, basePrice, category, tag, image }) {
      const nameFormatted = name
        ? formatTitle(name)
        : 'Product name not provided';
      const price = basePrice ? formatPrice(basePrice) : 'Price not provided';
      const categoryFormatted = category
        ? formatTitle(category)
        : 'Category not provided';
      const tagFormatted = tag ? formatTitle(tag) : 'Tag not provided';

      return {
        title: `Name: ${nameFormatted} | Price: ${price}`,
        subtitle: `Category: ${categoryFormatted} | Tag: ${tagFormatted}`,
        media: image || FaTshirt,
      };
    },
  },
});
