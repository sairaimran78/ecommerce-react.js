import { Form, Button, Card, Container, Row, Col } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [products, setProducts] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageURL, setImageURL] = useState("");

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5050/products");
      setProducts(res.data);
    } catch (err) {
      console.log("Fetch error:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);
  


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5050/product", {
        title, image: imageURL, description

      });
      alert("Product Added Successfully!");
      setTitle(""); setImageURL(""); setDescription("");
      fetchProducts(); 
    } catch (err) {
      alert("Error saving product!");
    }
  };

  return (
    <Container fluid className="py-4 px-4" style={{ backgroundColor: '#f0f2f5', minHeight: '100vh' }}>
      
      {/* 1. COMPACT ADD PRODUCT FORM (Centered) */}
      <Card className="mx-auto shadow-sm mb-5 border-0" style={{ maxWidth: '400px', borderRadius: '12px' }}>
        <Card.Body className="p-4">
          <h5 className="fw-bold mb-3">Add Product</h5>
          <Form onSubmit={handleSubmit}>
            <Form.Control size="sm" className="mb-2" type="text" placeholder="Product Name" value={title} onChange={(e)=>setTitle(e.target.value)} required />
            <Form.Control size="sm" className="mb-2" type="text" placeholder="Image URL" value={imageURL} onChange={(e)=>setImageURL(e.target.value)} required />
            <Form.Control size="sm" className="mb-3" as="textarea" rows={2} placeholder="Description" value={description} onChange={(e)=>setDescription(e.target.value)} required />
            <Button variant="dark" type="submit" className="w-100 btn-sm fw-bold">Add</Button>
          </Form>
        </Card.Body>
      </Card>

      {/* 2. PRODUCT CATALOG SECTION */}
      <h3 className="text-center fw-bold mb-4" style={{ color: '#333' }}>Product Catalog</h3>
      
      <Row className="justify-content-center g-3">
        {products.map((item, index) => (
          <Col xs={12} sm={6} md={4} lg={3} key={index}>
            <Card className="h-100 shadow-sm border-0" style={{ borderRadius: '15px', overflow: 'hidden', backgroundColor: '#fff' }}>
              {/* Image Container with fixed Aspect Ratio */}
              <div style={{ height: '220px', overflow: 'hidden' }}>
                <Card.Img 
                  src={item.image} 
                  style={{ height: '100%', width: '100%', objectFit: 'cover' }} 
                  onError={(e) => { e.target.src = 'https://via.placeholder.com/300?text=No+Image'; }}
                />
              </div>
              <Card.Body className="p-3">
                <h5 className="fw-bold mb-1" style={{ fontSize: '1.1rem' }}>{item.title}</h5>
                <p className="text-muted small mb-0" style={{ fontSize: '0.85rem' }}>{item.description}</p>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
  
}

export default App;