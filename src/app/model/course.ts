
export interface Course {
    uid: string;
    titles: {
        description: string;
        longDescription: string;
    };
    iconUrl: string;
    uploadedImageUrl: string;
    courseListIcon: string;
    categories: string[];
    lessonsCount: number;
}
