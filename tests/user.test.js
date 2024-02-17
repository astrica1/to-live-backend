const userService = require('../services/users');
import('chai').then(chai => {
    describe('Test User APIs', function () {
        it('should create new user', function () {
            const status = userService.createUser('user5', 'alireza', 'alireza@gmail.com', 'asr6kfs658sv', '0')
            expect(status.username).equal('user5');
        });
    
        it('should remove existing user', function () {
            const status = userService.deleteUser('user5', 'asr6kfs658sv')
            expect(status.message).equal('user deactived successfully')
        });
    });
}).catch(error => {
    console.error('Error importing chai:', error);
});

