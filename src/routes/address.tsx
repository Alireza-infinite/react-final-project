import { Link, useNavigate } from "react-router-dom";
import TextInput from "../features/form/TextInput";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { updateShippingAddress } from "../features/order/orderSlice";

const Address = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const order = useAppSelector((state) => state.order);

  if (!order.orderItems.length) {
    navigate("/cart");
  }
  return (
    <div>
      <form
        className="flex flex-col gap-4 px-4 pt-8"
        onSubmit={(e) => {
          e.preventDefault();
          const target = e.target as typeof e.target & {
            city: { value: string };
            address: { value: string };
            postalCode: { value: string };
            phone: { value: string };
          };
          dispatch(
            updateShippingAddress({
              city: target.city.value,
              address: target.address.value,
              postalCode: target.postalCode.value,
              phone: target.phone.value,
            }),
          );
          navigate("/checkout");
        }}
      >
        <TextInput label="City" type="text" name="city" />
        <TextInput label="Address" type="text" name="address" minLenght={10} />
        <TextInput label="Postal code" type="text" name="postalCode" />
        <TextInput
          label="Phone number"
          type="text"
          name="phone"
          pattern="09\d\d\d\d\d\d\d\d\d"
        />

        <div className="mt-8 flex items-center justify-between px-8">
          <Link to="/cart" className="text-gray-700">
            Back
          </Link>
          <input
            type="submit"
            value="Next"
            className="rounded bg-blue-500 px-4 py-2 text-white"
          />
        </div>
      </form>
    </div>
  );
};

export default Address;
