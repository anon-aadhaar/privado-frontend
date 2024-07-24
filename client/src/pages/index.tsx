import React, { useEffect, useState, useContext } from "react";
import { Selecter, ErrorPopup } from "@/app/components";
import { getIssuersList } from "@/services/issuer";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Unstable_Grid2";
import SelectedIssuerContext from "@/contexts/SelectedIssuerContext";
import { useRouter } from "next/router";
import { LaunchProveModal } from "@anon-aadhaar/react";

const App = () => {
  const router = useRouter();

  const onClick = () => {
    router.push("/signin");
  };

  const [issuerList, setIssuerList] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const { setSelectedIssuerContext } = useContext(SelectedIssuerContext);

  const handleSelectIssuer = (selectedIssuer: string) => {
    setSelectedIssuerContext(selectedIssuer);
  };

  useEffect(() => {
    const fetchIssuers = async () => {
      try {
        const issuers = await getIssuersList();
        setIssuerList(issuers);
      } catch (error) {
        setError(`Failed to fetch issuers ${error}`);
      }
    };

    fetchIssuers();
  }, []);

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: "100vh" }}
    >
      {isConnected ? (
        <>
          <Grid xs={4}>
            {error ? (
              <ErrorPopup error={error} />
            ) : (
              <Selecter
                datalist={issuerList}
                label="Select issuer"
                callback={handleSelectIssuer}
              />
            )}
          </Grid>
          <Grid xs={2}>
            <Button
              variant="contained"
              style={{ width: "100%", marginTop: "15px" }}
              onClick={onClick}
            >
              Sign In
            </Button>
          </Grid>
        </>
      ) : (
        <Grid>
          <LaunchProveModal
            nullifierSeed={1234}
            useTestAadhaar={true}
            buttonTitle="Generate your Anon Aaadhaar credential"
          />
        </Grid>
      )}
    </Grid>
  );
};

export default App;
