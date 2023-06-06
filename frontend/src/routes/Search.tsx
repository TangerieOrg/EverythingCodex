import SearchBanner from '@components/SearchBanner';
import { API_ROOT } from '@modules/API';

export default function SearchRoute() {
    return <div class="min-h-screen w-screen flex flex-col justify-center ">
        <div class="w-full mb-44">
            <SearchBanner/>
        </div>
    </div>
}