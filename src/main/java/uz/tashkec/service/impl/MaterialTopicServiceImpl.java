package uz.tashkec.service.impl;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import uz.tashkec.domain.MaterialTopic;
import uz.tashkec.repository.MaterialTopicRepository;
import uz.tashkec.service.MaterialTopicService;
import uz.tashkec.service.dto.MaterialTopicDTO;
import uz.tashkec.service.mapper.MaterialTopicMapper;

/**
 * Service Implementation for managing {@link MaterialTopic}.
 */
@Service
@Transactional
public class MaterialTopicServiceImpl implements MaterialTopicService {

    private final Logger log = LoggerFactory.getLogger(MaterialTopicServiceImpl.class);

    private final MaterialTopicRepository materialTopicRepository;

    private final MaterialTopicMapper materialTopicMapper;

    public MaterialTopicServiceImpl(MaterialTopicRepository materialTopicRepository, MaterialTopicMapper materialTopicMapper) {
        this.materialTopicRepository = materialTopicRepository;
        this.materialTopicMapper = materialTopicMapper;
    }

    @Override
    public MaterialTopicDTO save(MaterialTopicDTO materialTopicDTO) {
        log.debug("Request to save MaterialTopic : {}", materialTopicDTO);
        MaterialTopic materialTopic = materialTopicMapper.toEntity(materialTopicDTO);
        materialTopic = materialTopicRepository.save(materialTopic);
        return materialTopicMapper.toDto(materialTopic);
    }

    @Override
    public MaterialTopicDTO update(MaterialTopicDTO materialTopicDTO) {
        log.debug("Request to update MaterialTopic : {}", materialTopicDTO);
        MaterialTopic materialTopic = materialTopicMapper.toEntity(materialTopicDTO);
        materialTopic = materialTopicRepository.save(materialTopic);
        return materialTopicMapper.toDto(materialTopic);
    }

    @Override
    public Optional<MaterialTopicDTO> partialUpdate(MaterialTopicDTO materialTopicDTO) {
        log.debug("Request to partially update MaterialTopic : {}", materialTopicDTO);

        return materialTopicRepository
            .findById(materialTopicDTO.getId())
            .map(existingMaterialTopic -> {
                materialTopicMapper.partialUpdate(existingMaterialTopic, materialTopicDTO);

                return existingMaterialTopic;
            })
            .map(materialTopicRepository::save)
            .map(materialTopicMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public List<MaterialTopicDTO> findAll() {
        log.debug("Request to get all MaterialTopics");
        return materialTopicRepository.findAll().stream().map(materialTopicMapper::toDto).collect(Collectors.toCollection(LinkedList::new));
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<MaterialTopicDTO> findOne(Long id) {
        log.debug("Request to get MaterialTopic : {}", id);
        return materialTopicRepository.findById(id).map(materialTopicMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete MaterialTopic : {}", id);
        materialTopicRepository.deleteById(id);
    }
}
