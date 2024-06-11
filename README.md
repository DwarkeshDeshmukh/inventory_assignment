### Inventory Backend API Documentation and Usage

This project implements a RESTful API'S using Node.js with Express, designed to manage an inventory system, customer carts, and discount coupons. Below is a concise guide to understanding the core functionalities of this API, including various endpoints and their descriptions.

### Important Note

These APIs are deployed using Vercel and can be explored and tested directly via the comprehensive documentation on Postman:


- [Exportd Postman collection link](https://elements.getpostman.com/redirect?entityId=32461181-893a1dee-fbd4-4114-acd8-30cde9ad8734&entityType=collection)

- [API Documentation on Postman](https://documenter.getpostman.com/view/32461181/2sA3XMjP7u)


---

### Considerations for Edge Cases

- **Insufficient Inventory:** When removing items from inventory or adding to cart, handle cases where inventory does not have enough quantity.
- **Invalid Inputs:** Implement checks for invalid data types and values to ensure robust API handling.
- **Invalid Discount Coupon:** Handle invalid or expired discount coupons to prevent erroneous application.

### Conclusion

This documentation provides a guide to using and implementing the API for managing inventory, carts, and discounts effectively. Feel free to refer to Postman documentation or directly test the API endpoints hosted on Vercel for further exploration.

