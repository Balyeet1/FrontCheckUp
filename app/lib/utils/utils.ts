function encrypt_or_dencrypt_Id(id: number, encrypt?: boolean): string {
    if (encrypt) return ((id + 15) * 7).toString()

    return (id / 7 - 15).toString()
}

export function createSlug(title: string, id?: string) {
    let slug = title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
    if (id) {
        slug += '-' + encrypt_or_dencrypt_Id(parseInt(id), true);
    }
    return slug;
}

export function getIdFromSlug(slug: string): number {

    if (!slug || typeof slug !== 'string') {
        throw new Error('Invalid slug');
    }

    const parts = slug.split('-');

    return parseInt(encrypt_or_dencrypt_Id(parseInt(parts[parts.length - 1])));
}