import { HiShoppingCart } from 'react-icons/hi2';

const Navbar = () => {
  return (
    <nav className='text-white bg-gray-900'>
      <div className='container flex justify-between p-4 mx-auto font-semibold'>
        <h3 className='text-2xl'>Novel</h3>
        <div className='relative'>
          <HiShoppingCart size='2em' />
          <div className='absolute flex items-center justify-center w-3 h-3 p-2 bg-white border border-black rounded-full -right-1 -top-1'>
            <p className='text-sm text-black'>1</p>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
