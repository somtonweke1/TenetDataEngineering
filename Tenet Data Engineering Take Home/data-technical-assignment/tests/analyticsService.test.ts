import { getAnalyticsForPartner, getAnalyticsForOfferStatus } from './analyticsService';



describe('Analytics Service', () => {
  describe('getAnalyticsForPartner', () => {
    it('should fetch analytics for a specific partner', async () => {
     
      const mockReturnData = [{ ... }];  

      const result = await getAnalyticsForPartner('APPLE');
      expect(result).toEqual(mockReturnData);
    });
  });

  describe('getAnalyticsForOfferStatus', () => {
    it('should fetch analytics for a specific offer status', async () => {
      
      const mockReturnData = [{ ... }]; 

      const result = await getAnalyticsForOfferStatus('ACCEPTED');
      expect(result).toEqual(mockReturnData);
    });
  });
});
