import SearchRoute from "../Route/SearchRoute";
const SearchAction=(values)=>
{
    const formData = new FormData();
    formData.append("name",values.name);
    formData.append("day",values.day);
    formData.append("search",values.search);
    console.log(formData);
    return SearchRoute(formData);
}

export default SearchAction;