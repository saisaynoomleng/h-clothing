import { FaBriefcase } from 'react-icons/fa';
import { defineField, defineType } from 'sanity';
import { sanitySlugifier } from './components/sanitySlugifier';
import { formatTitle } from '@/lib/utils';

export const careerType = defineType({
  name: 'career',
  title: 'Careers',
  type: 'document',
  icon: FaBriefcase,
  fields: [
    defineField({
      name: 'name',
      title: 'Position Name',
      type: 'string',
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: (doc) => `${doc.name}-career`,
        slugify: sanitySlugifier,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'department',
      title: 'Department',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'Position Description',
      type: 'blockContent',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      name: 'name',
      department: 'department',
    },
    prepare({ name, department }) {
      const nameFormatted = name
        ? formatTitle(name)
        : 'Position name not provided';
      const departmentFormatted = department
        ? formatTitle(department)
        : 'Department not specified';

      return {
        title: nameFormatted,
        subtitle: `Department: ${departmentFormatted}`,
      };
    },
  },
});
