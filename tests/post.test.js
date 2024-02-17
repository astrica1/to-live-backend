const postService = require('../services/posts');
import('chai').then(chai => {
    describe('Test Posting APIs', function () {
        it('should create new post', function () {
            const status = postService.createPost('title', 'content', 'user1', category1);
            expect(status.title).equal('title');
            expect(status.content).equal('content');
        });
    });
}).catch(error => {
    console.error('Error importing chai:', error);
});