from huggingface_hub import snapshot_download
import os

def download_model(model_name, save_dir):
    """
    Download all files from a Hugging Face model repository.
    
    Args:
        model_name (str): Name of the model on Hugging Face Hub
        save_dir (str): Local directory path to save the model
    """
    try:
        print(f"Downloading all files from {model_name}...")
        
        # Download the complete repository
        snapshot_download(
            repo_id=model_name,
            local_dir=save_dir,
            local_dir_use_symlinks=False  # To get actual files, not symlinks
        )
        
        print(f"Model successfully downloaded to {save_dir}")
        
    except Exception as e:
        print(f"Error occurred: {str(e)}")

if __name__ == "__main__":
    model_name = "LingoIITGN/mBERT_toxic_hindi"
    save_directory = f"/home/himanshubeniwal/downloaded_models/{model_name.split('/')[-1]}"
    download_model(model_name, save_directory)