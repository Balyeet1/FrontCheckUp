export const STATUS_ENDPOINT = '/status';

export const userEndpoints = {
    Login: '/login',
    CreateUser: '/users/create',
}

export const blogEndpoints = {
    List: '/blog/list',
    Create: '/blog/create',
    Get: (blogId: number): string => `/blog/get?id=${blogId}`,
    Delete: (blogId: number): string => `/blog/delete/${blogId}`,
    Edit: (blogId: number): string => `/blog/${blogId}/edit`,
};
