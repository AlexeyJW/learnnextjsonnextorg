'use client';
interface OrderProps {

    numberTable: string;
  
  }
import { useState, useEffect } from "react";
import Image from "next/image";
import Button from '@mui/joy/Button';
import { Trash, Send } from "@deemlol/next-icons";    
import Menu from '@mui/joy/Menu';
import MenuButton from '@mui/joy/MenuButton';
import MenuItem from '@mui/joy/MenuItem';
import Dropdown from '@mui/joy/Dropdown'
import Input from '@mui/joy/Input';
export default function Order(numberTable:OrderProps) {
    const [data, setData] = useState(null);
    const [cart, setCart] = useState([]);
    const [payment, setPayment] = useState(0); // Стан для збереження введеної суми
    useEffect(() => {
        fetch('https://dummyjson.com/products')
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(setData)
            .catch((e) => console.error("Error in Order component:", e));
    }, []);

    const addToCart = (product) => {
        setCart((prevCart) => {
            const existingProduct = prevCart.find((item) => item.id === product.id);
            if (existingProduct) {
                return prevCart.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                return [...prevCart, { ...product, quantity: 1 }];
            }
        });
    };

    const calculateTotal = () => {
        return cart.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    const handlePaymentChange = (e) => {
        const value = parseFloat(e.target.value) || 0; // Перетворюємо введене значення на число
        setPayment(value);
    };

    const removeFromCart = (productId) => {
        setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
    };

    const total = calculateTotal();
    const rest = payment - total; // Розрахунок решти
    const sendOrder = () => {
        if (cart.length === 0) {
            alert("Your cart is empty. Please add items to your cart before sending the order.");
            return;
        }
        const orderDetails = {
            tableNumber: numberTable.numberTable,
            items: cart,
            sum: total,
            worker: "Alex", // Тут можна додати логіку для вибору працівника
            time: new Date().toLocaleTimeString(),

        };
        console.log("Order sent:", orderDetails);
    }
    return (
        <div className="flex  p-4 ">
            <div className="basis-3/4 flex gap-4 flex-wrap mb-4">
                {data &&
                    data.products.map((product) => (
                        <div
                            key={product.id}
                            className="border border-zinc-800 p-4 mb-4 basis-1/6 cursor-pointer"
                            onClick={() => addToCart(product)}
                        >
                            <h2 className="text-lg font-semibold">{product.title}</h2>
                            <Image
                                alt="product"
                                src={product.thumbnail}
                                width={60}
                                height={60}
                            />
                            <p className="text-green-600 font-bold">${product.price}</p>
                        </div>
                    ))}
            </div>

            <div className="basis-1/4 border-t border-zinc-800 pt-4">
                <h2 className="text-xl font-bold mb-4">Cart of Table #:{numberTable.numberTable} </h2>
                {cart.length > 0 ? (
                    <div>
                        {cart.map((item, index) => (
                            <div
                                key={item.id}
                                className="flex justify-between items-center mb-2"
                            >
                                <span> <Button 
                                            size="md" 
                                            variant={"outlined"} 
                                            color="danger" 
                                            startDecorator={<Trash size={24} color="purple  " />}
                                            onClick={()=> removeFromCart(item.id)}>
                                </Button></span>
                                <span>{++index}. {item.title} (x{item.quantity})</span>
                                <span>${item.price * item.quantity}</span>
                            </div>
                        ))}
                        <div className="text-lg font-bold mt-4">
                            Total: ${total.toFixed(2)}
                        </div>
                        <div>
                           
                            
                                  <Dropdown>
                                  <MenuButton>
                                  <Send size={24} color="purple" />
                                    Send order</MenuButton>
                                  <Menu>
                                    <MenuItem
                                    onClick={sendOrder}>Alex</MenuItem>
                                    <MenuItem>John</MenuItem>
                                    <MenuItem>Jane</MenuItem>
                                    <MenuItem>Doe</MenuItem>

                                  </Menu>
                                </Dropdown>
                            
                        </div>
                        <div className="border-t border-zinc-800 pt-4">
                            <h4>Pay for order</h4>
                            <Input
                                placeholder="Input money"
                                variant="outlined"
                                color="success"
                                value={payment} // Прив'язка до стану
                                onChange={handlePaymentChange} // Обробник зміни
                            />
                            <p>Rest: {rest >= 0 ? rest.toFixed(2) : "Not enough money"}</p>
                        </div>
                    </div>
                ) : (
                    <p>Your cart is empty.</p>
                )}
            </div>
        </div>
    );
}