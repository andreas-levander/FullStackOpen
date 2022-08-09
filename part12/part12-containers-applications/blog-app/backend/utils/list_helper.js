import lodash from 'lodash';

const dummy = (blogs) => {
    return 1;
}

const totalLikes = (blogs) => {
    return blogs.length === 0
    ? 0
    : blogs.reduce((prev, {likes}) => (prev + likes), 0);
}

const favouriteBlog = (blogs) => {
    let toplikes = -1;
    let topblog = {};

    blogs.forEach((blog) => {
        if (blog.likes > toplikes) {
            topblog = blog;
            toplikes = blog.likes;
        }
    })

    return {
        title: topblog.title,
        author: topblog.author,
        likes: topblog.likes
    }
}

const mostBlogs = (blogs) => {
    const result = lodash.groupBy(blogs, 'author');

    const mostblogs = { author: null, blogs: 0 };

    for (const [author, blogs] of Object.entries(result)) {
        if(blogs.length > mostblogs.blogs) {
            mostblogs.author = author;
            mostblogs.blogs = blogs.length;
        }
    }
    return mostblogs;
}

const mostLikes = (blogs) => {
    const result = {};

    blogs.forEach((blog) => {
        let {author} = blog;
        result[author] = (isNaN(result[author]) ? 0 : result[author]) + blog.likes;
    })
    const mostlikes = {author: null,likes: -1};

    for (const [author, likes] of Object.entries(result)) {
        if(likes > mostlikes.likes) {
            mostlikes.author = author;
            mostlikes.likes = likes;
        }
    }
    
    return mostlikes;
}


  
export { dummy, totalLikes, favouriteBlog, mostBlogs, mostLikes }