
import FileItem from './FileItem'

export default function FileList ({ files, removeFile }){
    function deleteFileHandler(filename){
        removeFile(filename);
    }

    return (
        <ul className="file-list">
            {
                files &&
                files.map(f => (<FileItem
                    key={f.name}
                    file={f}
                    deleteFile={deleteFileHandler} />))
            }
        </ul>
    )
}
