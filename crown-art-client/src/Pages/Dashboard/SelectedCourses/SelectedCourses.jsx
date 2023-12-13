import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure/useAxiosSecure";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdPayment } from "react-icons/md";
import EmptyInfo from "../../Shared/EmptyInfo/EmptyInfo";

const SelectedCourses = () => {
  const { user } = useAuth();

  const [axiosSecure] = useAxiosSecure();

  const { data: bookingItems = [], refetch } = useQuery({
    queryKey: ["courseBookings"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/courseBookings?email=${user?.email}`);
      return res.data;
    },
  });

  const handleDelete = (bookingItem) => {
    axiosSecure.delete(`/courseBookings/${bookingItem?._id}`).then((res) => {
      if (res.data.deletedCount > 0) {
        refetch();
        toast.success("Your selected course has been deleted");
      }
    });
  };

  return (
    <>
      <div className="w-full px-6">
        {bookingItems &&
        Array.isArray(bookingItems) &&
        bookingItems.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="table w-full text-center">
              <thead className="bg-[#90c641e6]">
                <tr className="text-white capitalize">
                  <th></th>
                  <th>Name</th>
                  <th>Course Fee</th>
                  <th>Delete</th>
                  <th>Pay</th>
                </tr>
              </thead>
              <tbody>
                {bookingItems &&
                  bookingItems.map((bookingItem, idx) => (
                    <tr key={bookingItem._id}>
                      <th>{idx + 1}</th>

                      <td>
                        <div className="flex items-center gap-3">
                          <div className="avatar">
                            <div className="w-32 h-16 rounded">
                              <img src={bookingItem?.image} alt="" />
                            </div>
                          </div>
                          <div className="font-bold">{bookingItem?.name}</div>
                        </div>
                      </td>

                      <td>
                        <span className="text-lg">{"\u09F3"}</span>
                        {bookingItem?.price}
                      </td>

                      <td>
                        <button
                          onClick={() => handleDelete(bookingItem)}
                          className="btn btn-ghost btn-sm"
                        >
                          <RiDeleteBin6Line
                            className="text-warning"
                            size={20}
                          ></RiDeleteBin6Line>
                        </button>
                      </td>

                      <td>
                        <Link to={`/dashboard/payment/${bookingItem?._id}`}>
                          <button className="btn btn-ghost btn-sm">
                            <MdPayment
                              className="text-accent"
                              size={20}
                            ></MdPayment>
                          </button>
                        </Link>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        ) : (
          <EmptyInfo
            message={"You didn't selected any course. Select first!"}
            address={"/courses"}
            label={"select course"}
          />
        )}
      </div>
    </>
  );
};

export default SelectedCourses;
