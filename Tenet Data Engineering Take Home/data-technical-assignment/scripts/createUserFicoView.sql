CREATE VIEW User_Fico_View AS
SELECT ua.name, ua.email, fb.band
FROM UserAnalytics ua
INNER JOIN FicoBand fb ON ua.id = fb.id;
