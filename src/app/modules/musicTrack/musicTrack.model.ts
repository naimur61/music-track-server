import { Schema, model } from "mongoose";
import { IMusicTrack, MusicTrackModel } from "./musicTrack.interface";

const musicTrackSchema = new Schema<IMusicTrack>(
	{
		title: {
			type: String,
			required: true,
		},
		artist: {
			type: String,
			required: true,
		},
		musicUrl: {
			type: URL,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

export const MusicTrack = model<IMusicTrack, MusicTrackModel>("AcademicSemester", musicTrackSchema);
