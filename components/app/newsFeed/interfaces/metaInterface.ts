import SizesInterface from "./sizesInterface";

export default interface Meta {
    width: number;
    height: number;
    sizes: {
        'bb-media-activity-image': SizesInterface;
        'bb-media-photos-album-directory-image': SizesInterface;
        'bb-media-photos-album-directory-image-medium': SizesInterface;
        'bb-media-photos-popup-image': SizesInterface;
    };
}