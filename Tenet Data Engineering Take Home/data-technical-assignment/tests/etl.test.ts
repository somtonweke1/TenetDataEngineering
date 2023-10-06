import { transformUsersForAnalytics } from './scripts/etl';

// exported  function for testing.

describe('ETL process', () => {
  describe('transformUsersForAnalytics', () => {
    it('should transform users to analytics data format', () => {
      const mockUsers = [{
        email: 'test@example.com',
        name: 'Test User',
        ficoScore: 720,
        applications: [{
          offers: [{
            status: 'ACCEPTED',
            loanAmount: 10000,
            partner: 'APPLE'
          }]
        }]
      }];

      const result = transformUsersForAnalytics(mockUsers);
      const expectedOutput = [{
        userEmail: 'test@example.com',
        userName: 'Test User',
        userFicoScore: 720,
        offerStatus: 'ACCEPTED',
        offerLoanAmount: 10000,
        applicationPartner: 'APPLE',
        createdAt: expect.any(Date)  //  date is generated at runtime.
      }];

      expect(result).toEqual(expectedOutput);
    });
  });
});
