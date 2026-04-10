import { BsPencil } from 'react-icons/bs';
import { CiTextAlignJustify } from 'react-icons/ci';
import { FaBriefcase, FaNewspaper, FaQuestion, FaTshirt } from 'react-icons/fa';
import { FaUserGroup } from 'react-icons/fa6';
import { IoMdColorPalette, IoMdPricetag, IoMdResize } from 'react-icons/io';
import { MdCategory } from 'react-icons/md';
import { SiNike } from 'react-icons/si';
import type { StructureResolver } from 'sanity/structure';

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('H Clothing')
    .items([
      S.divider().title('Operation'),
      S.documentTypeListItem('product').title('Products').icon(FaTshirt),
      S.documentTypeListItem('productCategory')
        .title('Product Categories')
        .icon(MdCategory),
      S.documentTypeListItem('productColor')
        .title('Product Colors')
        .icon(IoMdColorPalette),
      S.documentTypeListItem('productSize')
        .title('Product Sizes')
        .icon(IoMdResize),
      S.documentTypeListItem('productBrand')
        .title('Product Brands')
        .icon(SiNike),
      S.documentTypeListItem('productTag')
        .title('Product Tags')
        .icon(IoMdPricetag),
      S.documentTypeListItem('teamMember')
        .title('Team Members')
        .icon(FaUserGroup),
      S.documentTypeListItem('career').title('Job Listings').icon(FaBriefcase),
      S.documentTypeListItem('faq').title('FAQs').icon(FaQuestion),
      S.documentTypeListItem('utilityPage')
        .title('Utility Pages')
        .icon(CiTextAlignJustify),

      S.divider().title('Marketing'),
      S.documentTypeListItem('blog').title('Blogs').icon(FaNewspaper),
      S.documentTypeListItem('author').title('Authors').icon(BsPencil),
      S.documentTypeListItem('blogCategory')
        .title('Blog Categories')
        .icon(MdCategory),
    ]);
