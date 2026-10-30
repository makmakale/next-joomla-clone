import * as p from 'drizzle-orm/pg-core';

export const bannerTracksTable = p.pgTable(
    'banner_tracks',
    {
        trackDate: p.timestamp('track_date', { mode: 'date' }).notNull(),
        trackType: p.bigint('track_type', { mode: 'number' }).notNull(),
        bannerId: p.bigint('banner_id', { mode: 'number' }).notNull(),
        count: p.bigint('count', { mode: 'number' }).default(0).notNull(),
    },
    table => [
        p.primaryKey({ columns: [table.trackDate, table.trackType, table.bannerId] }),
        p.index('banner_tracks_idx_track_date').on(table.trackDate),
        p.index('banner_tracks_idx_track_type').on(table.trackType),
        p.index('banner_tracks_idx_banner_id').on(table.bannerId),
    ],
);

export type BannerTrack = typeof bannerTracksTable.$inferSelect;
export type NewBannerTrack = typeof bannerTracksTable.$inferInsert;
