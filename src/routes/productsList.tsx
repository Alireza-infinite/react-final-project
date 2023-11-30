import { AdjustmentsIcon } from "../app/icons";
import PageHeader from "../features/layout/PageHeader";
import Filters from "../features/products/Filters";
import Products from "../features/products/Products";
import { useState } from "react";

const ProductsList = () => {
  const [sidebarIsShown, setSidebarIsShown] = useState<boolean>(false);
  const toggleSidebar = () => setSidebarIsShown((p) => !p);

  return (
    <div className={`h-screen ${sidebarIsShown ? "overflow-hidden" : ""}`}>
      <PageHeader>
        <h2>Products</h2>
        <span onClick={toggleSidebar} className="md:hidden">
          {<AdjustmentsIcon className="h-6 w-6" />}
        </span>
      </PageHeader>
      <div className="md:grid md:grid-cols-4">
        <div className="md:col-span-3">
          <Products />
        </div>
        <div className="md:col-span-1">
          <Filters toggleSidebar={toggleSidebar} isShown={sidebarIsShown} />
        </div>
      </div>
    </div>
  );
};

export default ProductsList;
