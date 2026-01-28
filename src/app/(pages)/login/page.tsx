"use client";
import ManualLogin from "@/components/layout/ManualLogin";
import DashboardWrapper from "@/layouts/DashboardWrapper";

const page = () => {
  return (
    <div>
      <DashboardWrapper>
        <ManualLogin />
      </DashboardWrapper>
    </div>
  );
};

export default page;
