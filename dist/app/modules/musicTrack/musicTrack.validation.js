"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MusicTrackValidation = void 0;
const zod_1 = require("zod");
const createMusicTrackZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({
            required_error: "Title is required",
        }),
        artist: zod_1.z.string({ required_error: "Artist is required" }),
        category: zod_1.z.string({ required_error: "Category is required" }),
        musicUrl: zod_1.z
            .string({
            required_error: "Url is required",
        })
            .url(),
    }),
});
exports.MusicTrackValidation = {
    createMusicTrackZodSchema,
};
