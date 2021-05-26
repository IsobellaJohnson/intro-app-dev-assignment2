import React from 'react';
const List = (props) => {
    const {api} = props;
    if(!api || api.length === 0) return <p>API not found.</p>;
    return (
        <ul>
          <h2 className='list-head'>api</h2>
          {api.map((api) => {
            return (
            <table key={api.id}>
        <tr>
            <th>Title</th>
            <th>Genre</th>
            <th>Year</th>
            <th>Director</th>
        </tr>
        <tr>
            <td>{api.title}</td>
        </tr>
            </table>
            );
          })}
        </ul>
      );
};
export default List;