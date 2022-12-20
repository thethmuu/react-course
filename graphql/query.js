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

export const GET_PRODUCT = `
  query getProducts($slug: String!) {
    products(filters: { slug: { eq: $slug } }) {
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
