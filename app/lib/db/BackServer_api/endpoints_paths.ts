export const STATUS_ENDPOINT = '/status';

export const userEndpoints = {
    Login: '/login',
    CreateUser: '/users/create',
}

export const imagesEndpoint = {
    List: 'image/list',
    Store: 'image/store'
}

export const blogEndpoints = {
    List: '/blog/list',
    Create: '/blog/create',
    Get: (blogId: number): string => `/blog/get?id=${blogId}`,
    GetBlogImage: (image_name: string): string => `/blog/image/${image_name}`,
    GetBlogImageUrl: (image_name: string): string => `/blog/image/url/${image_name}`,
    Delete: (blogId: number): string => `/blog/delete/${blogId}`,
    Edit: (blogId: number): string => `/blog/${blogId}/edit`,
};
