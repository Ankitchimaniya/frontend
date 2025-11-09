import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IoMdHelp, IoMdCall, IoMdMail, IoMdTime, IoMdChatbubbles, IoMdArrowBack } from 'react-icons/io';
import { FaWhatsapp, FaQuestionCircle, FaUserShield, FaUtensils, FaCreditCard } from 'react-icons/fa';
import { MdDeliveryDining, MdPayment } from 'react-icons/md';

const Help = () => {
    const navigate = useNavigate();

    const handleBackToUser = () => {
        navigate(-1); // Go back to previous page
    };
    const contactInfo = [
        {
            icon: <IoMdCall className="text-2xl text-green-600" />,
            title: "Phone Support",
            info: "+91 1800-123-4567",
            description: "Call us for immediate assistance",
            available: "24/7 Available"
        },
        {
            icon: <IoMdMail className="text-2xl text-blue-600" />,
            title: "Email Support",
            info: "help@foodapp.com",
            description: "Send us your queries",
            available: "Response within 2 hours"
        },
        {
            icon: <FaWhatsapp className="text-2xl text-green-500" />,
            title: "WhatsApp",
            info: "+91 9876543210",
            description: "Chat with us on WhatsApp",
            available: "Mon-Sun: 8 AM - 10 PM"
        },
        {
            icon: <IoMdChatbubbles className="text-2xl text-purple-600" />,
            title: "Live Chat",
            info: "Start Chat",
            description: "Instant chat support",
            available: "24/7 Available"
        }
    ];

    const faqCategories = [
        {
            icon: <FaUtensils className="text-2xl text-orange-600" />,
            title: "Orders & Food",
            questions: [
                "How to place an order?",
                "Can I modify my order after placing it?",
                "What if my food is cold or incorrect?",
                "How to track my order?",
                "Minimum order requirements"
            ]
        },
        {
            icon: <MdDeliveryDining className="text-2xl text-blue-600" />,
            title: "Delivery",
            questions: [
                "What are the delivery charges?",
                "How long does delivery take?",
                "Can I schedule a delivery?",
                "What are your delivery areas?",
                "What if my delivery is late?"
            ]
        },
        {
            icon: <FaCreditCard className="text-2xl text-green-600" />,
            title: "Payments & Refunds",
            questions: [
                "What payment methods do you accept?",
                "Is online payment secure?",
                "How to get a refund?",
                "When will I receive my refund?",
                "Payment failed but money deducted"
            ]
        },
        {
            icon: <FaUserShield className="text-2xl text-purple-600" />,
            title: "Account & Privacy",
            questions: [
                "How to create an account?",
                "Forgot password?",
                "How to update my profile?",
                "Is my data secure?",
                "How to delete my account?"
            ]
        }
    ];

    const quickActions = [
        {
            icon: <MdPayment className="text-xl" />,
            title: "Request Refund",
            description: "Get refund for your order",
            action: "Start Refund Process"
        },
        {
            icon: <IoMdTime className="text-xl" />,
            title: "Track Order",
            description: "Check your order status",
            action: "Track Now"
        },
        {
            icon: <FaQuestionCircle className="text-xl" />,
            title: "Report Issue",
            description: "Report order or delivery issues",
            action: "Report Problem"
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* Back Button */}
                    <div className="mb-6">
                        <button 
                            onClick={handleBackToUser}
                            className="flex items-center text-orange-600 hover:text-orange-700 transition-colors font-medium"
                        >
                            <IoMdArrowBack className="text-xl mr-2" />
                            Back to User
                        </button>
                    </div>
                    
                    <div className="text-center">
                        <div className="flex justify-center mb-4">
                            <IoMdHelp className="text-6xl text-orange-500" />
                        </div>
                        <h1 className="text-4xl font-bold text-gray-900 mb-2">How can we help you?</h1>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Find answers to your questions or get in touch with our support team
                        </p>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Quick Actions */}
                <div className="mb-12">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {quickActions.map((action, index) => (
                            <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer">
                                <div className="flex items-center mb-4">
                                    <div className="p-3 bg-orange-100 rounded-full mr-4">
                                        {action.icon}
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900">{action.title}</h3>
                                        <p className="text-gray-600 text-sm">{action.description}</p>
                                    </div>
                                </div>
                                <button className="w-full bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 transition-colors">
                                    {action.action}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Contact Information */}
                <div className="mb-12">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Us</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {contactInfo.map((contact, index) => (
                            <div key={index} className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow">
                                <div className="flex justify-center mb-4">
                                    {contact.icon}
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">{contact.title}</h3>
                                <p className="text-orange-600 font-medium mb-2">{contact.info}</p>
                                <p className="text-gray-600 text-sm mb-2">{contact.description}</p>
                                <p className="text-green-600 text-xs font-medium">{contact.available}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* FAQ Section */}
                <div className="mb-12">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {faqCategories.map((category, index) => (
                            <div key={index} className="bg-white rounded-lg shadow-md p-6">
                                <div className="flex items-center mb-4">
                                    {category.icon}
                                    <h3 className="text-xl font-semibold text-gray-900 ml-3">{category.title}</h3>
                                </div>
                                <ul className="space-y-3">
                                    {category.questions.map((question, qIndex) => (
                                        <li key={qIndex} className="flex items-center text-gray-700 hover:text-orange-600 cursor-pointer transition-colors">
                                            <FaQuestionCircle className="text-sm text-gray-400 mr-3 flex-shrink-0" />
                                            <span className="text-sm">{question}</span>
                                        </li>
                                    ))}
                                </ul>
                                <button className="mt-4 text-orange-600 text-sm font-medium hover:text-orange-700 transition-colors">
                                    View All Questions →
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Additional Help Section */}
                <div className="bg-white rounded-lg shadow-md p-8">
                    <div className="text-center">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Still need help?</h2>
                        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                            Can't find what you're looking for? Our support team is here to help you 24/7. 
                            Get in touch with us and we'll get back to you as soon as possible.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button className="bg-orange-500 text-white px-8 py-3 rounded-md hover:bg-orange-600 transition-colors font-medium">
                                Start Live Chat
                            </button>
                            <button className="border border-orange-500 text-orange-600 px-8 py-3 rounded-md hover:bg-orange-50 transition-colors font-medium">
                                Send Email
                            </button>
                        </div>
                    </div>
                </div>

                {/* Operating Hours */}
                <div className="mt-8 bg-blue-50 rounded-lg p-6">
                    <div className="flex items-center justify-center">
                        <IoMdTime className="text-2xl text-blue-600 mr-3" />
                        <div className="text-center">
                            <h3 className="text-lg font-semibold text-gray-900">Support Hours</h3>
                            <p className="text-gray-600">Monday - Sunday: 24/7 Available</p>
                            <p className="text-sm text-gray-500">Live chat and phone support always available</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Help;