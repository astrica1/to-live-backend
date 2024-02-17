const categoryService = require('../services/categories');
import('chai').then(chai => {
    describe('Test Category APIs', function () {
        it('should create new category', function () {
            const status = categoryService.createCategory('category5')
            expect(status.categoryName).equal('category5');
        });
    
        it('should remove existing category', function () {
            const status = categoryService.removeCategory('category5')
            expect(status.message).equal('category removed successfully');
        });
    });
}).catch(error => {
    console.error('Error importing chai:', error);
});