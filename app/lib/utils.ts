export function createSlug(title: string, id?: string) {
    let slug = title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
    if (id) {
        slug += '-' + id;
    }
    return slug;
}

export function getIdFromSlug(slug: string): number {

    if (!slug || typeof slug !== 'string') {
        throw new Error('Invalid slug');
    }

    const parts = slug.split('-');
    return parseInt(parts[parts.length - 1]);
}