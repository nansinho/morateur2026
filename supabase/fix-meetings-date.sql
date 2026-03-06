-- Correction de la date de l'événement "Meetings publics"
-- La date affichée était "Mars 2026" au lieu de "8 mars 2026"
UPDATE events SET date = '8 mars 2026' WHERE title = 'Meetings publics' AND sort_order = 3;
