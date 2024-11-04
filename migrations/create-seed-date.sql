-- Insert sample users password =password
INSERT INTO users (username, email, password, role) VALUES
('adminUser', 'admin@example.com', '$2a$10$GeKE46jD3.tgB9EnnFCUu.LTTc.B2AohMqykthiDjoUKe4Z3VCAbq', 'admin'),
('vendorUser', 'vendor@example.com', '$2a$10$GeKE46jD3.tgB9EnnFCUu.LTTc.B2AohMqykthiDjoUKe4Z3VCAbq', 'vendor'),
('regularUser', 'user@example.com', '$2a$10$GeKE46jD3.tgB9EnnFCUu.LTTc.B2AohMqykthiDjoUKe4Z3VCAbq', 'user');

-- Insert sample products
INSERT INTO products (name, price, image, vendor_id) VALUES
('Product 1', 10.00, 'image1.jpg', 2), -- Assuming vendorUser has ID 2
('Product 2', 20.00, 'image2.jpg', 2), -- Same vendor
('Product 3', 15.50, 'image3.jpg', 2); -- Same vendor


