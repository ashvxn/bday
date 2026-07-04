import { useEffect } from "react";
import { track } from "@vercel/analytics";

const DESTINATION = "https://wa.me/918138010307?text=free%20hostel%20campaign";

export default function Redirect() {
  useEffect(() => {
    track("campaign_redirect");
    window.location.replace(DESTINATION);
  }, []);

  return null;
}
