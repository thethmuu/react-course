export const GET_PRODUCTS = `
  query {
  products {
    data {
      id
      attributes {
        title
        slug
        description
        price
        image {
          data {
            attributes {
              formats
            }
          }
        }
        
      }
    }
  }
}
`;
