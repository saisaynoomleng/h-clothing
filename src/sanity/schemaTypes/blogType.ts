import { FaNewspaper } from 'react-icons/fa';
import { defineField, defineType } from 'sanity';
import { sanitySlugifier } from './components/sanitySlugifier';
import { formatDate, formatTitle } from '@/lib/utils';

export const blogType = defineType({
  name: 'blog',
  title: 'Blog',
  icon: FaNewspaper,
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: (doc) => `${doc.name}-blog`,
        slugify: sanitySlugifier,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Blog Category',
      type: 'reference',
      to: [{ type: 'blogCategory' }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'minRead',
      title: 'Min Read',
      type: 'number',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'author',
      title: 'Blog Author',
      type: 'reference',
      to: [{ type: 'author' }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Publish Date',
      type: 'date',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'mainImage',
      title: 'Blog Cover Photo',
      type: 'blockImage',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'Blog Text',
      type: 'blockContent',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      name: 'name',
      date: 'publishedAt',
      category: 'category.name',
      author: 'author.name',
      image: 'mainImage',
    },
    prepare({ name, date, category, author, image }) {
      const nameFormatted = name ? formatTitle(name) : 'Title not provided';
      const dateFormatted = date
        ? formatDate(date)
        : 'Published date not specified';
      const categoryFormatted = category
        ? formatTitle(category)
        : 'Category not provided';
      const authorFormatted = author
        ? formatTitle(author)
        : 'Author name not provided';

      return {
        title: nameFormatted,
        subtitle: `Published: ${dateFormatted} | Category: ${categoryFormatted} | Author: ${authorFormatted}`,
        media: image || FaNewspaper,
      };
    },
  },
});
