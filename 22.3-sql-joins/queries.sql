-- write your queries here

SELECT * FROM owners JOIN vehicles ON vehicles.owner_id = owners.id;

SELECT first_name, last_name, COUNT(*) AS count FROM owners JOIN vehicles ON vehicles.owner_id = owners.id GROUP BY owners.id ORDER BY count, first_name;

SELECT first_name, last_name, CAST(AVG(price) AS int) AS average_price, COUNT(*) AS count FROM owners JOIN vehicles ON vehicles.owner_id = owners.id GROUP BY owners.id HAVING CAST(AVG(price) AS int) > 10000 AND COUNT(*) > 1 ORDER BY  first_name DESC;