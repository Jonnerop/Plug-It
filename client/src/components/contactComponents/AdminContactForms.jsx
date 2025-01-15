import { useState, useEffect } from 'react';

const AdminContactForms = () => {
  const [contactForms, setContactForms] = useState([]);
  const [expandedRows, setExpandedRows] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const token = localStorage.getItem('site');

  useEffect(() => {
    fetchContactForms();
  }, []);

  const fetchContactForms = async () => {
    try {
      const response = await fetch('/api/contact', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setContactForms(data);
      } else {
        setError('Failed to fetch contact forms');
      }
    } catch (err) {
      setError('An error occurred while fetching contact forms');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/contact/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        setContactForms(contactForms.filter((form) => form._id !== id));
        alert('Contact form deleted successfully');
      } else {
        alert('Failed to delete contact form');
      }
    } catch (err) {
      alert('An error occurred while deleting the contact form');
      console.error(err);
    }
  };

  const toggleRowExpansion = (id) => {
    setExpandedRows((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-electricBlue font-Orbitron text-xl">
          Loading contact forms...
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="text-salmonRed font-Roboto">{error}</div>;
  }

  return (
    <div className="p-8 min-h-screen">
      <h1 className="text-3xl font-Orbitron font-bold text-eGreen mb-6">
        Admin Contact Forms
      </h1>
      {contactForms.length === 0 ? (
        <div className="text-mediumGreen font-Roboto">
          No contact forms available
        </div>
      ) : (
        <table className="w-full border-collapse border border-mediumBlue rounded-lg overflow-hidden bg-darkerBlue">
          <thead>
            <tr className="bg-mediumGreen text-white">
              <th className="border border-lightGreen px-4 py-2 font-Roboto">
                Name
              </th>
              <th className="border border-lightGreen px-4 py-2 font-Roboto">
                Email
              </th>
              <th className="border border-lightGreen px-4 py-2 font-Roboto">
                Content
              </th>
              <th className="border border-lightGreen px-4 py-2 font-Roboto">
                Date
              </th>
              <th className="border border-lightGreen px-4 py-2 font-Roboto">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {contactForms.map((form) => (
              <tr key={form._id} className="hover:bg-darkBlue text-white">
                <td className="border border-mediumBlue px-4 py-2">
                  {form.name}
                </td>
                <td className="border border-mediumBlue px-4 py-2">
                  {form.email}
                </td>
                <td className="border border-mediumBlue px-4 py-2">
                  {expandedRows[form._id] || form.content.length <= 100 ? (
                    form.content
                  ) : (
                    `${form.content.substring(0, 120)}...`
                  )}
                  {form.content.length > 100 && (
                    <button
                      onClick={() => toggleRowExpansion(form._id)}
                      className="ml-2 text-eGreen underline"
                    >
                      {expandedRows[form._id] ? 'Show Less' : 'Show More'}
                    </button>
                  )}
                </td>
                <td className="border border-mediumBlue px-4 py-2">
                  {new Date(form.createdAt).toLocaleString()}
                </td>
                <td className="border border-mediumBlue px-4 py-2">
                  <button
                    onClick={() => handleDelete(form._id)}
                    className="bg-salmonRed text-white px-4 py-2 rounded hover:bg-red-700 transition-colors duration-300"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminContactForms;
