import React, {useState, useEffect, useMemo} from "react";
import axios from "axios";
import Item from "./item";
import Select from "rc-select";
import Pagination from "rc-pagination";
import localeInfo from "rc-pagination/lib/locale/en_US";
import "rc-pagination/assets/index.css";
import "rc-select/assets/index.css";
import {NumberEntryForm} from "./NumberEntryForm/components/NumberEntryForm";

const List = React.memo(function List(props) {

  const [numberEntry, setNumberEntry] = useState(50);
  const [primeNumbers, setPrimeNumbers] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(12);
  // limitation - number of prime numbers returned.
  const [limitation, setLimitation] = useState(100);

  //Call to the prime numbers server to retrieve the list of prime numbers up to the number entered (numberEntry) and page size.
  async function getData(page, pageSize, numberEntry) {
    try {
      const {data} = await axios.get(
        `http://localhost:8081/primes/${numberEntry}?limit=${pageSize}&start=${(page - 1) * pageSize}`
      );
      setPrimeNumbers(data.results);
      setLimitation(data.total ? data.total : 24);
    } catch (e) {
      console.log(e);
    }
  }

  // run effect after changes to one of the dependencies, such as user selects another page.
  useEffect(() => {
    getData(page, pageSize, numberEntry);
  }, [page, pageSize, numberEntry]);


  const primeNumbersList = useMemo(
    () => primeNumbers.map((item, index) => <Item item={item} key={index}/>),
    [primeNumbers]
  );

  const numberEntryForm = useMemo(() => (
    <NumberEntryForm numberEntry={numberEntry} onChange={(numberEntry) => {
      setPage(1);
      setNumberEntry(numberEntry);
      setLimitation(0)
    }}/>
  ), [setNumberEntry, setLimitation, setPage, numberEntry]);

  const pagination = useMemo(() => (
    <Pagination
      selectComponentClass={Select}
      style={{ margin: '50px', justifyContent:'center', alignItems:'center',
        borderRadius: 5, padding:
        10, fontSize: 12 }}
      pageSize={pageSize}
      pageSizeOptions={["12", "60", "120"]}
      total={limitation}
      showSizeChanger
      onShowSizeChange={(current, pageSize) => {
        setPageSize(pageSize);
        setPage(1)
      }}
      current={page}
      onChange={page => setPage(page)}
      locale={localeInfo}
      showTotal={(total, range) =>
        `${range[0]} - ${range[1]} of ${total} items`
      }
    />
  ), [page, setPage, pageSize, limitation, setLimitation, setNumberEntry]);

  return (
    <div>
      <h1>Prime numbers</h1>
      <h3>Submit a number to return a list of prime numbers that are less than or equal to that entry.</h3>
      <h3>Maximum entry is 1 million.</h3>
      {numberEntryForm}
      <ul>{primeNumbersList}</ul>
      <div>{pagination}</div>
    </div>
  );
});
export default List;
