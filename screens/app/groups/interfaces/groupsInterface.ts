export default interface GroupsInterface {
    id: number;
    creator_id: number;
    parent_id: number;
    date_created: string;
    description: {
        raw: string;
    };
    link: string;
    name: string;
    slug: string;
    members_count: string;
    avatar_urls: {
        thumb: string;
        full: string;
        is_default: boolean;
    };
    cover_url: string;
}