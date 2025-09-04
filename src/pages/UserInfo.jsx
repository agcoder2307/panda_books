import Header from "../components/Header";
import robot from "../assets/hero/robot.jpg";
import cyborg from "../assets/services/service-3.png";
const UserInfo = () => {
  const user = {
    avatar: "/account.svg",
    username: "John Doe",
    email: "john.doe@example.com",
    cart: [
      {
        id: 1,
        title: "English Learning Book",
        price: 50000,
        quantity: 2,
        image: robot,
      },
      {
        id: 2,
        title: "Grammar Mastery Guide",
        price: 65000,
        quantity: 1,
        image: cyborg,
      },
    ],
    purchaseHistory: [
      {
        id: 1,
        title: "Beginner's English",
        price: 40000,
        quantity: 1,
        date: "2025-08-21",
        image: robot,
      },
      {
        id: 2,
        title: "Advanced Vocabulary",
        price: 70000,
        quantity: 2,
        date: "2025-07-10",
        image: cyborg,
      },
    ],
  };

  return (
    <div className="bg-white min-h-screen">
      <Header />
      <div className="container mx-auto px-6 py-12">
        {/* User Info */}
        <div className="flex flex-col md:flex-row items-center gap-6 mb-12">
          <img
            src={user.avatar}
            alt={user.username}
            className="w-32 h-32 rounded-full object-cover shadow-lg"
          />
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              {user.username}
            </h1>
            <p className="text-gray-600">{user.email}</p>
          </div>
        </div>

        {/* Cart */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">My Cart</h2>
          <div className="space-y-6">
            {user.cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-6 p-4 rounded-xl shadow-md bg-gray-50"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-20 h-20 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {item.title}
                  </h3>
                  <p className="text-gray-600">Quantity: {item.quantity}</p>
                </div>
                <p className="text-lg font-bold text-gray-900">
                  {item.price} UZS
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Purchase History */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Purchase History
          </h2>
          <div className="space-y-6">
            {user.purchaseHistory.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-6 p-4 rounded-xl shadow-md bg-gray-50"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-20 h-20 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {item.title}
                  </h3>
                  <p className="text-gray-600">Quantity: {item.quantity}</p>
                  <p className="text-gray-500 text-sm">
                    Purchased on: {item.date}
                  </p>
                </div>
                <p className="text-lg font-bold text-gray-900">
                  {item.price} UZS
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
