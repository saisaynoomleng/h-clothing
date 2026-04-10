import { relations, sql } from 'drizzle-orm';
import * as t from 'drizzle-orm/pg-core';

export const timestamp = {
  createdAt: t
    .timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: t
    .timestamp('updated_at', { withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
};

export const userStatus = t.pgEnum('userStatus', ['customer', 'admin']);

export const productStatus = t.pgEnum('productStatus', [
  'draft',
  'published',
  'out of stock',
]);

export const invoiceStatus = t.pgEnum('invoiceStatus', [
  'pending',
  'cancelled',
  'paid',
]);

export const contactStatus = t.pgEnum('contactStatus', ['new', 'replied']);

export const UserTable = t.pgTable(
  'users',
  {
    id: t.uuid('id').primaryKey().defaultRandom(),
    firstName: t.varchar('first_name', { length: 255 }).notNull(),
    lastName: t.varchar('last_name', { length: 255 }).notNull(),
    email: t.varchar('email', { length: 255 }).notNull(),
    clerkUserId: t.varchar('clerk_user_id', { length: 255 }).notNull().unique(),
    imageUrl: t.varchar('image_url', { length: 255 }),
    status: userStatus('status').notNull().default('customer'),
    ...timestamp,
  },
  (table) => [t.uniqueIndex('clerk_user_id_idx').on(table.clerkUserId)],
);

export const AddressTable = t.pgTable('addresses', {
  id: t.uuid('id').primaryKey().defaultRandom(),
  userId: t
    .uuid('user_id')
    .references(() => UserTable.id, { onDelete: 'cascade' })
    .notNull(),
  address1: t.varchar('address_1', { length: 255 }).notNull(),
  address2: t.varchar('address_2', { length: 255 }),
  zip: t.varchar('zip', { length: 255 }).notNull(),
  city: t.varchar('city', { length: 255 }).notNull(),
  state: t.varchar('state', { length: 255 }).notNull(),
  country: t.varchar('country', { length: 255 }).notNull(),
  isDefault: t.boolean('is_default').notNull().default(false),
  ...timestamp,
});

export const ProductTable = t.pgTable('products', {
  id: t.uuid('id').primaryKey().defaultRandom(),
  sanityId: t.varchar('sanity_id', { length: 255 }).notNull().unique(),
  sanitySlug: t.varchar('sanity_slug', { length: 255 }).notNull().unique(),
  basePriceInCents: t.integer('base_price_in_cents').notNull(),
  imageUrl: t.varchar('image_url', { length: 255 }).notNull(),
  status: productStatus('status').notNull().default('published'),
  isDeleted: t.boolean('is_deleted').notNull().default(false),
  ...timestamp,
});

export const ProductVariantsTable = t.pgTable(
  'product_variants',
  {
    id: t.uuid('id').primaryKey().defaultRandom(),
    productId: t
      .uuid('product_id')
      .references(() => ProductTable.id, { onDelete: 'cascade' })
      .notNull(),
    sanitySku: t.varchar('sanity_sku', { length: 255 }).notNull().unique(),
    color: t.varchar('color', { length: 255 }).notNull(),
    size: t.varchar('size', { length: 255 }),
    priceOverrideInCents: t.integer('price_override_in_cents'),
    numberInStock: t.integer('number_in_stock').notNull(),
    imageUrl: t.varchar('image_url', { length: 255 }).notNull(),
    ...timestamp,
  },
  (table) => [t.check('stock_check', sql`${table.numberInStock} > 0`)],
);

export const InvoiceTable = t.pgTable(
  'invoices',
  {
    id: t.uuid('id').primaryKey().defaultRandom(),
    userId: t
      .uuid('user_id')
      .references(() => UserTable.id, { onDelete: 'set null' })
      .notNull(),
    shippingId: t
      .uuid('shipping_id')
      .references(() => AddressTable.id, { onDelete: 'set null' }),
    stripeCheckoutSessionId: t
      .varchar('stripe_checkout_session_id', { length: 255 })
      .unique(),
    stripePaymentIntentId: t
      .varchar('stripe_payment_intent_id', { length: 255 })
      .unique(),
    totalInCentsSnapshot: t.integer('total_in_cents_snapshot').notNull(),
    status: invoiceStatus('status').notNull().default('pending'),
    ...timestamp,
  },
  (table) => [
    t.index('shipping_idx').on(table.shippingId),
    t.index('user_invoice_idx').on(table.userId),
  ],
);

export const InvoiceLineTable = t.pgTable('invoice_lines', {
  id: t.uuid('id').primaryKey().defaultRandom(),
  productId: t
    .uuid('product_id')
    .references(() => ProductVariantsTable.id, { onDelete: 'set null' }),
  productVariantId: t
    .uuid('product_variant_id')
    .references(() => ProductVariantsTable.id, { onDelete: 'set null' }),
  invoiceId: t
    .uuid('invoice_id')
    .references(() => InvoiceTable.id, { onDelete: 'cascade' }),
  quantity: t.integer('quantity').notNull(),
  basePriceInCentsSnapshot: t.integer('base_price_in_cents_snapshot').notNull(),
  ...timestamp,
});

export const ReviewTable = t.pgTable(
  'reviews',
  {
    id: t.uuid('id').primaryKey().defaultRandom(),
    userId: t
      .uuid('user_id')
      .references(() => UserTable.id, { onDelete: 'cascade' }),
    productId: t
      .uuid('product_id')
      .references(() => ProductTable.id, { onDelete: 'cascade' }),
    title: t.text('title').notNull(),
    reviewAt: t
      .timestamp('review_at', { withTimezone: true })
      .notNull()
      .defaultNow(),
    body: t.text('body').notNull(),
    rating: t.integer('rating').notNull(),
    imageUrl: t.varchar('image_url', { length: 255 }),
    ...timestamp,
  },
  (table) => [
    t.uniqueIndex('user_product_idx').on(table.userId, table.productId),
    t.check('rating_check', sql`${table.rating} BETWEEN 1 AND 5`),
  ],
);

export const CareerTable = t.pgTable('careers', {
  id: t.uuid('id').primaryKey().defaultRandom(),
  sanityId: t.varchar('sanity_id', { length: 255 }).notNull().unique(),
  sanitySlug: t.varchar('sanity_slug', { length: 255 }).notNull().unique(),
  name: t.varchar('name', { length: 255 }).notNull(),
  isOpen: t.boolean('is_open').notNull().default(true),
  isDeleted: t.boolean('is_deleted').notNull().default(false),
  ...timestamp,
});

export const ApplicationTable = t.pgTable('applications', {
  id: t.uuid('id').primaryKey().defaultRandom(),
  careerId: t
    .uuid('career_id')
    .references(() => CareerTable.id, { onDelete: 'cascade' }),
  firstName: t.varchar('first_name', { length: 255 }).notNull(),
  lastName: t.varchar('last_name', { length: 255 }).notNull(),
  email: t.varchar('email', { length: 255 }).notNull(),
  phone: t.varchar('phone', { length: 255 }).notNull(),
  resumeUrl: t.varchar('resume_url', { length: 255 }).notNull(),
  ...timestamp,
});

export const PreviousEmployerTable = t.pgTable('previous_employer', {
  id: t.uuid('id').primaryKey().defaultRandom(),
  applicationId: t
    .uuid('application_id')
    .references(() => ApplicationTable.id, { onDelete: 'cascade' }),
  name: t.varchar('name', { length: 255 }).notNull(),
  email: t.varchar('email', { length: 255 }).notNull(),
  phone: t.varchar('phone', { length: 255 }).notNull(),
  startedDate: t.timestamp('started_date', { withTimezone: true }).notNull(),
  endedDate: t.timestamp('ended_date', { withTimezone: true }),
  reasonForLeaving: t.text('reason_for_leaving').notNull(),
  position: t.varchar('position', { length: 255 }),
  ...timestamp,
});

export const ContactTable = t.pgTable('contacts', {
  id: t.uuid('id').primaryKey().defaultRandom(),
  fullName: t.varchar('full_name', { length: 255 }).notNull(),
  email: t.varchar('email', { length: 255 }).notNull(),
  subject: t.text('subject').notNull(),
  message: t.text('message').notNull(),
  status: contactStatus('status').notNull().default('new'),
  ...timestamp,
});

export const NewsletterSubscriptionTable = t.pgTable(
  'newsletter_subscriptions',
  {
    id: t.uuid('id').primaryKey().defaultRandom(),
    email: t.varchar('email', { length: 255 }).notNull().unique(),
  },
);

// relations
export const UserTableRelations = relations(UserTable, ({ many }) => ({
  addresses: many(AddressTable),
  orders: many(InvoiceTable),
  reviews: many(ReviewTable),
}));

export const AddressTableRelations = relations(
  AddressTable,
  ({ one, many }) => ({
    user: one(UserTable, {
      fields: [AddressTable.userId],
      references: [UserTable.id],
    }),
    orders: many(InvoiceTable),
  }),
);

export const ProductTableRelations = relations(
  ProductTable,
  ({ one, many }) => ({
    reviews: many(ReviewTable),
    invoiceLine: many(InvoiceLineTable),
    variants: many(ProductVariantsTable),
  }),
);

export const ProductVariantsTableRelations = relations(
  ProductVariantsTable,
  ({ one }) => ({
    product: one(ProductTable, {
      fields: [ProductVariantsTable.productId],
      references: [ProductTable.id],
    }),
  }),
);

export const ReviewTableRelations = relations(ReviewTable, ({ one }) => ({
  user: one(UserTable, {
    fields: [ReviewTable.userId],
    references: [UserTable.id],
  }),
  product: one(ProductTable, {
    fields: [ReviewTable.productId],
    references: [ProductTable.id],
  }),
}));

export const InvoiceTableRelations = relations(
  InvoiceTable,
  ({ one, many }) => ({
    user: one(UserTable, {
      fields: [InvoiceTable.userId],
      references: [UserTable.id],
    }),
    invoiceLines: many(InvoiceLineTable),
    shippingAddress: one(AddressTable, {
      fields: [InvoiceTable.shippingId],
      references: [AddressTable.id],
    }),
  }),
);

export const InvoiceLineTableRelations = relations(
  InvoiceLineTable,
  ({ one }) => ({
    product: one(ProductTable, {
      fields: [InvoiceLineTable.productId],
      references: [ProductTable.id],
    }),
    productVariant: one(ProductVariantsTable, {
      fields: [InvoiceLineTable.productVariantId],
      references: [ProductVariantsTable.id],
    }),
    invoice: one(InvoiceTable, {
      fields: [InvoiceLineTable.invoiceId],
      references: [InvoiceTable.id],
    }),
  }),
);

export const CareerTableRelations = relations(CareerTable, ({ many }) => ({
  applications: many(ApplicationTable),
}));

export const ApplicationTableRelations = relations(
  ApplicationTable,
  ({ one, many }) => ({
    career: one(CareerTable, {
      fields: [ApplicationTable.careerId],
      references: [CareerTable.id],
    }),
    previousEmployers: many(PreviousEmployerTable),
  }),
);

export const PreviousEmployerTableRelations = relations(
  PreviousEmployerTable,
  ({ one }) => ({
    application: one(ApplicationTable, {
      fields: [PreviousEmployerTable.applicationId],
      references: [ApplicationTable.id],
    }),
  }),
);
